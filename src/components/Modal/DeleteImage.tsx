import {
  Button,
  ButtonGroup,
  CloseButton,
  Flex,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useBreakpointValue,
  useColorMode,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { RiDeleteBin2Fill } from 'react-icons/Ri';
import React from "react";
import { useMutation, useQueryClient } from 'react-query';
import { api } from '../../services/api';
import { deleteImageFromCache, switchToTheSameAmountOfPagesAsBefore } from "../../utils/mutationFavorite";

interface Image {
  id: string;
  title: string;
  description: string;
  url: string;
  isFavorite: boolean;
}

interface Page {
  after: string | null;
  data: Array<Image>;
}

interface QueryResult {
  pages: Array<Page>;
  pageParams: Array<string | undefined>;
}

interface QueryContext {
  previousData: QueryResult;
  laterData: QueryResult;
  favoritePreviousData: QueryResult;
  favoriteLaterData: QueryResult;
}

interface DeleteImageProps {
  imageId: string;
}

export function ModalDeleteImage({ imageId }: DeleteImageProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalVersions = useBreakpointValue({ base: "xs", sm: "sm", md: "md", lg: "lg", xl: "xl" })
  const initialFocusRef = React.useRef();
  const toast = useToast();
  const { colorMode } = useColorMode();

  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(
    async () => await api.delete(`/api/images/${imageId}`),
    {
      onMutate: async (): Promise<QueryContext> => {
        await queryClient.cancelQueries('images')
        await queryClient.cancelQueries('favorites')

        const previousData = queryClient.getQueryData<QueryResult>('images')
        const favoritePreviousData = queryClient.getQueryData<QueryResult>('favorites')

        const { normalUpdateQuery, favoriteUpdateQuery } = await deleteImageFromCache(imageId, 6)
        const laterData = switchToTheSameAmountOfPagesAsBefore(previousData, normalUpdateQuery);
        const favoriteLaterData = switchToTheSameAmountOfPagesAsBefore(favoritePreviousData, favoriteUpdateQuery);

        return { previousData, laterData, favoritePreviousData, favoriteLaterData }
      },
      onSuccess: (data, variables, context: QueryContext) => {
        queryClient.setQueryData('images', context.laterData)
        queryClient.setQueryData('favorites', context.favoriteLaterData)
      },
      onError: (error, variables, context: QueryContext) => {
        queryClient.setQueryData('images', context.previousData)
        queryClient.setQueryData('favorites', context.favoritePreviousData)
      },
      onSettled: () => {
        queryClient.invalidateQueries('images')
        queryClient.invalidateQueries('favorites')
      }
    });

  const deleteImage = async () => {
    try {
      await mutateAsync();
      toast({
        title: "Imagem excluída",
        description: "Sua imagem foi excluída com sucesso.",
        status: "success",
        isClosable: true,
      })
    } catch (error) {
      onClose();
      toast({
        title: "Falha ao excluir",
        description: "Ocorreu um erro ao tentar excluir a imagem.",
        status: "error",
        isClosable: true,
      })
    }
  }

  return (
    <>
      <IconButton
        variant="toogleIcon-dark/light"
        borderRadius="0.25rem"
        onClick={onOpen}
        aria-label="Excluir imagem"
        icon={
          <Icon
            as={RiDeleteBin2Fill}
            role="img"
            aria-label="Ícone de exclusão"
            position="absolute"
            w={["1.15745625rem", "1.218375rem", "1.2825rem", "1.35rem", "1.4175rem"]}
            h={["1.15745625rem", "1.218375rem", "1.2825rem", "1.35rem", "1.4175rem"]}
          />
        }
      />

      <Modal
        closeOnOverlayClick={false}
        blockScrollOnMount={true}
        isCentered
        motionPreset="scale"
        initialFocusRef={initialFocusRef}
        isOpen={isOpen}
        onClose={onClose}
        size={modalVersions}
      >
        <ModalOverlay />
        <ModalContent
          bgColor={colorMode === "dark" ? "modal.background-dark" : "modal.background-light"}
          color={colorMode === "dark" ? "modal.color-dark" : "modal.color-light"}
          borderRadius="none"
        >
          <ModalHeader
            padding={[4, 5, 6, 7, 8]}
          >
            <Flex alignItems="center" justifyContent="space-between">
              <Text fontWeight="bold">Confirmação</Text>
              <CloseButton
                onClick={onClose}
                borderRadius="0.25rem"
              />
            </Flex>
          </ModalHeader>

          <ModalBody
            paddingX={[4, 5, 6, 7, 8]}
            paddingY={0}
          >
            <Text fontSize="1rem">
              Tem certeza que deseja excluir a imagem?
            </Text>
          </ModalBody>

          <ModalFooter padding={[4, 5, 6, 7, 8]}>
            <ButtonGroup isAttached>
              <Button
                onClick={onClose}
                ref={initialFocusRef}
                variant="ghost"
              >
                <Text fontSize="1rem">Não</Text>
              </Button>
              <Button
                fontSize="1rem"
                onClick={deleteImage}
                isLoading={isLoading}
                loadingText="Excluindo"
                colorScheme="red"
              >
                <Text fontSize="inherit">Sim</Text>
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
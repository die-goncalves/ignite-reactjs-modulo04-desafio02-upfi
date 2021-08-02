import {
  Button,
  ButtonGroup,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
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
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialFocusRef = React.useRef()
  const toast = useToast()
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
        size="sm"
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
            w="1.35rem"
            h="1.35rem"
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
      >
        <ModalOverlay />
        <ModalContent
          bgColor={colorMode === "dark" ? "modal.background-dark" : "modal.background-light"}
          color={colorMode === "dark" ? "modal.color-dark" : "modal.color-light"}
          borderRadius="none"
        >
          <ModalHeader>Confirmação</ModalHeader>
          <ModalCloseButton borderRadius="0.25rem" />
          <ModalBody pb={6}>
            Tem certeza que deseja excluir a imagem?
          </ModalBody>

          <ModalFooter>
            <ButtonGroup isAttached>
              <Button
                onClick={onClose}
                ref={initialFocusRef}
                variant="ghost"
              >
                Não
              </Button>
              <Button
                onClick={deleteImage}
                isLoading={isLoading}
                loadingText="Excluindo"
                colorScheme="red"
              >
                Sim
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
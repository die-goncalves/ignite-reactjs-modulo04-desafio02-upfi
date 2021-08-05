import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  useColorMode,
  IconButton,
  Icon,
  useDisclosure,
  ModalHeader,
  ModalCloseButton,
  ButtonGroup,
  Button,
  FormControl,
  FormLabel,
  Box,
  useToast,
  useBreakpointValue,
  Flex,
  Text,
  CloseButton,
} from '@chakra-ui/react';
import React from 'react';
import { RiImageEditFill } from 'react-icons/Ri';
import { useForm } from 'react-hook-form';
import { TextInput } from '../Input/TextInput';
import { useMutation, useQueryClient } from 'react-query';
import { api } from '../../services/api';
import { updateInfoImageFromCache } from '../../utils/mutationFavorite';

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
  laterData: Array<Page>;
  favoritePreviousData: QueryResult;
  favoriteLaterData: Array<Page>;
}

interface UpdatedImg {
  title: string;
  description: string;
}

interface ModalUpdateImageProps {
  image: Image;
}

export function ModalUpdateImage({
  image
}: ModalUpdateImageProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const initialFocusRef = React.useRef();
  const { colorMode } = useColorMode();
  const modalVersions = useBreakpointValue({ base: "xs", sm: "sm", md: "md", lg: "lg", xl: "xl" })

  const formValidations = {
    title: {
      required: 'Título obrigatório',
      minLength: {
        value: 2,
        message: 'Mínimo de 2 caracteres'
      },
      maxLength: {
        value: 20,
        message: 'Máximo de 20 caracteres'
      }
    },
    description: {
      required: 'Descrição obrigatória',
      maxLength: {
        value: 65,
        message: 'Máximo de 65 caracteres'
      }
    },
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (variables: UpdatedImg) => {
      await api.put(`/api/images/${image.id}`, variables)
    },
    {
      onMutate: async (variables): Promise<QueryContext> => {
        await queryClient.cancelQueries('images')
        await queryClient.cancelQueries('favorites')

        const previousData = queryClient.getQueryData<QueryResult>('images')
        const favoritePreviousData = queryClient.getQueryData<QueryResult>('favorites')

        const laterData = updateInfoImageFromCache(previousData, variables, image.id)
        const favoriteLaterData = updateInfoImageFromCache(favoritePreviousData, variables, image.id)

        return { previousData, laterData, favoritePreviousData, favoriteLaterData }
      },
      onSuccess: (data, variables, context: QueryContext) => {
        queryClient.setQueryData('images', () => {
          return { pages: context.laterData, pageParams: context.previousData.pageParams }
        })
        queryClient.setQueryData('favorites', () => {
          return { pages: context.favoriteLaterData, pageParams: context.favoritePreviousData.pageParams }
        })
      },
      onError: (error, variables, context: QueryContext) => {
        queryClient.setQueryData('images', context.previousData)
        queryClient.setQueryData('favorites', context.favoritePreviousData)
      },
      onSettled: () => {
        queryClient.invalidateQueries('images')
        queryClient.invalidateQueries('favorites')
      }
    }
  )

  const {
    register,
    handleSubmit,
    reset,
    formState,
  } = useForm({
    defaultValues: {
      title: image.title,
      description: image.description
    }
  });
  const { errors } = formState;

  const onSubmit = async (data: UpdatedImg): Promise<void> => {
    try {
      await mutation.mutateAsync({
        title: data.title,
        description: data.description,
      });
      toast({
        title: "Imagem atualizada",
        description: "As informações da imagem foram atualizadas com sucesso.",
        status: "success",
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: "Falha na atualização",
        description: "Ocorreu um erro ao tentar atualizar as informações da imagem.",
        status: "error",
        isClosable: true,
      })
    } finally {
      reset({
        title: data.title,
        description: data.description
      });
      onClose();
    }
  }

  return (
    <>
      <IconButton
        variant="toogleIcon-dark/light"
        borderRadius="0.25rem"
        onClick={onOpen}
        aria-label="Atualizar informações da imagem"
        icon={
          <Icon
            as={RiImageEditFill}
            role="img"
            aria-label="Ícone de edição de imagem"
            position="absolute"
            w={["1.200325rem", "1.2635rem", "1.33rem", "1.4rem", "1.68rem"]}
            h={["1.200325rem", "1.2635rem", "1.33rem", "1.4rem", "1.68rem"]}
          />
        }
      />

      <Modal
        closeOnOverlayClick={false}
        blockScrollOnMount={true}
        initialFocusRef={initialFocusRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="scale"
        size={modalVersions}
      >
        <ModalOverlay />
        <ModalContent
          bg={colorMode === "dark" ? "modal.background-dark" : "modal.background-light"}
          color={colorMode === "dark" ? "modal.color-dark" : "modal.color-light"}
          borderRadius="none"
        >
          <ModalHeader padding={[4, 5, 6, 7, 8]}>
            <Flex alignItems="center" justifyContent="space-between">
              <Text fontWeight="bold">Atualização das informações</Text>
              <CloseButton
                onClick={() => {
                  onClose();
                  reset({
                    title: image.title,
                    description: image.description
                  });
                }}
                borderRadius="0.25rem"
              />
            </Flex>
          </ModalHeader>

          <ModalBody
            padding={0}
          >
            <Image
              src={image.url}
              alt={image.title}
              objectFit="cover"
              w="100%"
              h={40}
            />

            <Box
              as="form"
              onSubmit={handleSubmit(onSubmit)}
              paddingX={[4, 5, 6, 7, 8]}
              id="FormModalUpdateImage"
            >
              <FormControl marginTop="1rem">
                <FormLabel>Título da imagem</FormLabel>
                <TextInput
                  placeholder="Título da imagem..."
                  name="title"
                  error={errors.title}
                  {...register("title", formValidations.title)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Descrição da imagem</FormLabel>
                <TextInput
                  placeholder="Descrição da imagem..."
                  name="description"
                  error={errors.description}
                  {...register("description", formValidations.description)}
                />
              </FormControl>
            </Box>
          </ModalBody>

          <ModalFooter
            padding={[4, 5, 6, 7, 8]}
          >
            <ButtonGroup isAttached>
              <Button
                ref={initialFocusRef}
                type="button"
                onClick={() => {
                  reset({
                    title: image.title,
                    description: image.description
                  })
                  onClose()
                }}
                variant="ghost"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                form="FormModalUpdateImage"
                colorScheme="green"
                isLoading={formState.isSubmitting}
                loadingText="Atualizando"
              >
                Atualizar
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

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
} from '@chakra-ui/react';
import React from 'react';
import { RiImageEditFill } from 'react-icons/Ri';
import { useForm } from 'react-hook-form';
import { TextInput } from '../Input/TextInput';
import { useMutation, useQueryClient } from 'react-query';
import { api } from '../../services/api';
import cloneDeep from 'lodash.clonedeep';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface pagesQueryResult {
  after: string | null;
  data: Array<Card> | [];
}

interface QueryResult {
  pages: Array<pagesQueryResult>;
  pageParams: Array<string | undefined>;
}

interface QueryContext {
  previousData: QueryResult;
  laterData: Array<pagesQueryResult>;
}

interface UpdatedImg {
  title: string;
  description: string;
}

interface ModalUpdateImageProps {
  imgCard: Card;
}

export function ModalUpdateImage({
  imgCard
}: ModalUpdateImageProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { colorMode } = useColorMode();
  const initialFocusRef = React.useRef();

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
      await api.put(`/api/images/${imgCard.id}`, variables)
    },
    {
      onMutate: async (variables): Promise<QueryContext> => {
        await queryClient.cancelQueries('images')

        const previousData = queryClient.getQueryData<QueryResult>('images')
        const laterData = cloneDeep(previousData.pages)

        laterData.forEach(page => {
          page.data.forEach(img => {
            if (img.id === imgCard.id) {
              img.title = variables.title;
              img.description = variables.description;
            }
          })
        })

        return { previousData, laterData }
      },
      onSuccess: (data, variables, context: QueryContext) => {
        queryClient.setQueryData('images', () => {
          return { pages: context.laterData, pageParams: context.previousData.pageParams }
        })
      },
      onError: (error, variables, context: QueryContext) => {
        queryClient.setQueryData('images', context.previousData)
      },
      onSettled: () => {
        queryClient.invalidateQueries('images')
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
      title: imgCard.title,
      description: imgCard.description
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
      reset();
      onClose();
    }
  }

  return (
    <>
      <IconButton
        size="sm"
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
            w={6}
            h={6}
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
        size="md"
      >
        <ModalOverlay />
        <ModalContent
          bg={colorMode === "dark" ? "modal.background-dark" : "modal.background-light"}
          color={colorMode === "dark" ? "modal.color-dark" : "modal.color-light"}
          borderRadius="none"
        >
          <ModalHeader>Adicione novo título ou descrição</ModalHeader>
          <ModalCloseButton borderRadius="0.25rem" onClick={() => reset({
            title: imgCard.title,
            description: imgCard.description
          })} />
          <ModalBody
            padding="0"
          >
            <Image
              src={imgCard.url}
              alt={imgCard.title}
              objectFit="cover"
              w="100%"
              h={40}
            />

            <Box
              as="form"
              onSubmit={handleSubmit(onSubmit)}
              padding="1rem 1.5rem"
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
            padding="1rem 1.5rem 1.5rem"
          >
            <ButtonGroup isAttached>
              <Button
                ref={initialFocusRef}
                type="button"
                onClick={() => {
                  reset({
                    title: imgCard.title,
                    description: imgCard.description
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

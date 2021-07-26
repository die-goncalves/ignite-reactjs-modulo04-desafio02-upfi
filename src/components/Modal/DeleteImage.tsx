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

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface databaseData {
  data: Array<Card> | [];
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
  laterData: QueryResult;
}

interface DeleteImageProps {
  imgId: string;
}

const setNewDataAfterDelete = (dataQuery: QueryResult, dataDatabase: QueryResult) => {
  const numberOfPagesViewed = dataQuery.pages.length;
  const responsePageParams = dataDatabase.pageParams.slice(0, numberOfPagesViewed);
  const responsePages = dataDatabase.pages.slice(0, numberOfPagesViewed);
  return {
    pageParams: responsePageParams,
    pages: responsePages
  }
}

async function returnFaunaDatabase() {
  const pageSize = 6;
  const { data: dataX } = await api.get<databaseData>('/api/images', {
    params: {
      get: 'all-images'
    }
  });

  let formatData: QueryResult = {
    pageParams: [],
    pages: []
  };
  let startVector = 0;
  let endVector = pageSize;
  let eachPage: pagesQueryResult;

  if (dataX.data.length === 0) {
    eachPage = {
      data: [],
      after: null
    }
    formatData.pageParams.push(undefined);
    formatData.pages.push(eachPage);
  } else {
    let init = dataX.data.slice(startVector, endVector);
    while (init.length !== 0) {
      startVector = startVector + pageSize;
      endVector = endVector + pageSize;
      const prox = dataX.data.slice(startVector, endVector);

      if (prox.length !== 0) {
        eachPage = {
          data: init,
          after: prox[0].id
        }
      } else {
        eachPage = {
          data: init,
          after: null
        }
      }
      formatData.pages.push(eachPage);

      if (formatData.pages.length === 1) {
        formatData.pageParams.push(undefined);
      } else {
        formatData.pageParams.push(eachPage.data[0].id)
      }

      init = prox;
    }
  }

  return formatData;
}

export function ModalDeleteImage({ imgId }: DeleteImageProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialFocusRef = React.useRef()
  const toast = useToast()
  const { colorMode } = useColorMode();

  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(
    async () => await api.delete(`/api/images/${imgId}`),
    {
      onMutate: async (): Promise<QueryContext> => {
        await queryClient.cancelQueries('images')

        const previousData = queryClient.getQueryData<QueryResult>('images')

        const database = await returnFaunaDatabase()
        const { pages, pageParams } = setNewDataAfterDelete(previousData, database)
        const laterData = { pages, pageParams }

        return { previousData, laterData }
      },
      onSuccess: (data, variables, context: QueryContext) => {
        queryClient.setQueryData('images', context.laterData)
      },
      onError: (error, variables, context: QueryContext) => {
        queryClient.setQueryData('images', context.previousData)
      },
      onSettled: () => {
        queryClient.invalidateQueries('images')
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
      toast({
        title: "Falha ao excluir",
        description: "Ocorreu um erro ao tentar excluir a imagem.",
        status: "error",
        isClosable: true,
      })
    } finally {
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
import {
  IconButton,
  Icon,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { api } from '../../services/api';
import cloneDeep from 'lodash.clonedeep';
import { RiHeart3Fill, RiHeart3Line } from 'react-icons/Ri';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
  isFavorite: boolean;
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

interface ButtonFavoriteImageProps {
  imgCard: Card;
}

export function ButtonFavoriteImage({
  imgCard
}: ButtonFavoriteImageProps): JSX.Element {
  const toast = useToast();

  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (variables: string) => await api.put(`/api/images/${variables}/favorite`, imgCard),
    {
      onMutate: async (variables): Promise<QueryContext> => {
        await queryClient.cancelQueries('images')

        const previousData = queryClient.getQueryData<QueryResult>('images')
        const laterData = cloneDeep(previousData.pages)

        laterData.forEach(page => {
          page.data.forEach(img => {
            if (img.id === variables) {
              img.isFavorite = !img.isFavorite;
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

  const favoriteImage = async (imgCard: Card) => {
    try {
      await mutation.mutateAsync(imgCard.id);
      toast({
        title: imgCard.isFavorite ? "Imagem desfavoritada" : "Imagem favoritada",
        description: imgCard.isFavorite ? "Sua imagem foi removida da lista de favoritos." : "Sua imagem foi adicionada na lista de favoritos.",
        status: "info",
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: imgCard.isFavorite ? "Falha ao desfavoritar" : "Falha ao favoritar",
        description: imgCard.isFavorite ? "Ocorreu um erro ao tentar desfavoritar a imagem." : "Ocorreu um erro ao tentar favoritar a imagem.",
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
        onClick={() => favoriteImage(imgCard)}
        aria-label="Favoritar/Desfavoritar imagem"
        isLoading={mutation.isLoading}
        spinner={<Spinner size="sm" color="#FF4142" />}
        icon={
          imgCard.isFavorite ? (<Icon
            as={RiHeart3Fill}
            role="img"
            aria-label="Favoritar imagem"
            position="absolute"
            color="#FF4142"
            w="1.44rem"
            h="1.44rem"
          />) : (<Icon
            as={RiHeart3Line}
            role="img"
            aria-label="Desfavoritar imagem"
            position="absolute"
            color="#FF4142"
            w="1.44rem"
            h="1.44rem"
          />)
        }
      />
    </>
  )
}

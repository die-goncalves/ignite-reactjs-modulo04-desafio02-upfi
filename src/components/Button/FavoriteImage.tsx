import {
  IconButton,
  Icon,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { api } from '../../services/api';
import { RiHeart3Fill, RiHeart3Line } from 'react-icons/Ri';
import { switchToTheSameAmountOfPagesAsBefore, updateFavoriteImageFromCache } from '../../utils/mutationFavorite';

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

interface ButtonFavoriteImageProps {
  image: Image;
}

export function ButtonFavoriteImage({
  image
}: ButtonFavoriteImageProps): JSX.Element {
  const toast = useToast();

  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (variables: string) => await api.put(`/api/images/${variables}/favorite`, image),
    {
      onMutate: async (variables): Promise<QueryContext> => {
        await queryClient.cancelQueries('images')
        await queryClient.cancelQueries('favorites')

        const previousData = queryClient.getQueryData<QueryResult>('images')
        const favoritePreviousData = queryClient.getQueryData<QueryResult>('favorites')

        const { normalUpdateQuery, favoriteUpdateQuery } = await updateFavoriteImageFromCache(variables, 6)
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
    }
  )

  const favoriteImage = async (image: Image) => {
    try {
      await mutation.mutateAsync(image.id);
      toast({
        title: image.isFavorite ? "Imagem desfavoritada" : "Imagem favoritada",
        description: image.isFavorite ? "Sua imagem foi removida da lista de favoritos." : "Sua imagem foi adicionada na lista de favoritos.",
        status: "info",
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: image.isFavorite ? "Falha ao desfavoritar" : "Falha ao favoritar",
        description: image.isFavorite ? "Ocorreu um erro ao tentar desfavoritar a imagem." : "Ocorreu um erro ao tentar favoritar a imagem.",
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
        onClick={() => favoriteImage(image)}
        aria-label="Favoritar/Desfavoritar imagem"
        isLoading={mutation.isLoading}
        spinner={<Spinner size="sm" color="#FF4142" />}
        icon={
          image.isFavorite ? (<Icon
            as={RiHeart3Fill}
            role="img"
            aria-label="Favoritar imagem"
            position="absolute"
            color="#FF4142"
            w={["1.200325rem", "1.2635rem", "1.33rem", "1.4rem", "1.47rem"]}
            h={["1.200325rem", "1.2635rem", "1.33rem", "1.4rem", "1.47rem"]}
          />) : (<Icon
            as={RiHeart3Line}
            role="img"
            aria-label="Desfavoritar imagem"
            position="absolute"
            color="#FF4142"
            w={["1.200325rem", "1.2635rem", "1.33rem", "1.4rem", "1.47rem"]}
            h={["1.200325rem", "1.2635rem", "1.33rem", "1.4rem", "1.47rem"]}
          />)
        }
      />
    </>
  )
}

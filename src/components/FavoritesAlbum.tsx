import { IconButton, Icon } from '@chakra-ui/react';
import React from 'react';
import { BiBookHeart } from 'react-icons/bi';
import { useFavoriteImages } from '../contexts/FavoriteImagesContext';

export const FavoritesAlbum = (): JSX.Element => {
  const { showFavorites, setShowFavorites } = useFavoriteImages();

  return (
    <>
      <IconButton
        variant="toogleIcon-dark/light"
        borderRadius="0.25rem"
        aria-label="Abre/Fecha álbum de favoritos"
        title=" Álbum de favoritos"
        onClick={() => setShowFavorites(!showFavorites)}
        icon={
          <Icon
            as={BiBookHeart}
            color={showFavorites && "#FF4142"}
            role="img"
            position="absolute"
            w="1.45rem"
            h="1.45rem"
          />
        }
      />
    </>
  )
}

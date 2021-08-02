import { Box, Heading, Flex, Progress } from '@chakra-ui/react';
import { useFavoriteImages } from '../contexts/FavoriteImagesContext';

export function Loading(): JSX.Element {
  const { showFavorites } = useFavoriteImages();

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      h="100vh"
      flexDir="column"
    >
      <Box>
        <Heading>{showFavorites ? 'Carregando álbum de favoritos...' : 'Carregando álbum...'}</Heading>
        <Progress
          mt={4}
          size="xs"
          isIndeterminate
          bgColor="transparent"
          colorScheme="orange"
        />
      </Box>
    </Flex>
  );
}

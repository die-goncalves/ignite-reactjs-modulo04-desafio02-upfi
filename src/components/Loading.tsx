import { Box, Heading, Flex, Progress } from '@chakra-ui/react';
import { useFavoriteImages } from '../contexts/FavoriteImagesContext';

export function Loading(): JSX.Element {
  const { showFavorites } = useFavoriteImages();

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      h="100vh"
      w="100vw"
      flexDir="column"
    >
      <Box w={["inherit", "initial"]} px={["1rem", "1.125rem", "1.5rem", "2.5rem"]}>
        <Heading textAlign="center" fontSize={["1.125rem"]}>
          {showFavorites ? 'Carregando álbum de favoritos...' : 'Carregando álbum...'}
        </Heading>
        <Progress
          mt={4}
          size="sm"
          borderRadius="0.25rem"
          isIndeterminate
          bgColor="transparent"
          colorScheme="orange"
        />
      </Box>
    </Flex>
  );
}

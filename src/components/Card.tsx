import {
  Box,
  ButtonGroup,
  Heading,
  Text,
  Image,
  Skeleton,
  SkeletonText,
  useColorMode,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ModalDeleteImage } from './Modal/DeleteImage';
import { ModalUpdateImage } from './Modal/UpdateImage';
import { ButtonFavoriteImage } from './Button/FavoriteImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
  isFavorite: boolean;
}

interface CardProps {
  data: Card;
  viewImage: (url: string) => void;
}

export function Card({ data, viewImage }: CardProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const { colorMode } = useColorMode();

  return (
    <Box
      position="relative"
      key={data.ts}
      bgColor={colorMode === "dark" ? "card.background-dark" : "card.background-light"}
    >
      <Skeleton isLoaded={!isLoading}>
        <Box position="relative">
          <Image
            src={data.url}
            alt={data.title}
            objectFit="cover"
            w="100%"
            h={48}
            onClick={() => viewImage(data.url)}
            onLoad={() => setIsLoading(false)}
            cursor="pointer"
          />
        </Box>
      </Skeleton>

      <Box pt={3} pb={3} px={4}>
        {isLoading ? (
          <>
            <SkeletonText fontSize="2xl" mt={2} noOfLines={1} />
            <SkeletonText fontSize="md" mt={7} noOfLines={1} />
          </>
        ) : (
          <VStack
            display="flex"
            width="100%"
            spacing={2.5}
            color={colorMode === "dark" ? "card.color-dark" : "card.color-light"}
          >
            <Box
              width="inherit"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Heading fontSize="2xl">{data.title}</Heading>
              <ButtonGroup isAttached>
                <ModalDeleteImage imgId={data.id} />
                <ModalUpdateImage imgCard={data} />
                <ButtonFavoriteImage imgCard={data} />
              </ButtonGroup >
            </Box>
            <Box width="inherit">
              <Text fontSize="md">
                {data.description}
              </Text>
            </Box>
          </VStack>
        )}
      </Box>
    </Box>
  );
}

import {
  Box,
  ButtonGroup,
  Heading,
  Text,
  Image,
  Skeleton,
  SkeletonText,
  useColorMode,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ModalDeleteImage } from './Modal/DeleteImage';
import { ModalUpdateImage } from './Modal/UpdateImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
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
        <Image
          src={data.url}
          alt={data.title}
          objectFit="cover"
          w="max"
          h={48}
          onClick={() => viewImage(data.url)}
          onLoad={() => setIsLoading(false)}
          cursor="pointer"
        />
      </Skeleton>

      <Box pt={5} pb={4} px={6}>
        {isLoading ? (
          <>
            <SkeletonText fontSize="2xl" mt={2} noOfLines={1} />
            <SkeletonText fontSize="md" mt={7} noOfLines={1} />
          </>
        ) : (
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box
              color={colorMode === "dark" ? "card.color-dark" : "card.color-light"}
              maxWidth="11rem"
            >
              <Heading fontSize="2xl">{data.title}</Heading>
              <Text mt={2.5} fontSize="md">
                {data.description}
              </Text>
            </Box>

            <ButtonGroup isAttached>
              <ModalDeleteImage imgId={data.id} />
              <ModalUpdateImage imgCard={data} />
            </ButtonGroup >
          </Box>
        )}
      </Box>
    </Box>
  );
}

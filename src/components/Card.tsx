import {
  Box,
  Heading,
  Text,
  Image,
  Skeleton,
  SkeletonText,
  useColorMode,
} from '@chakra-ui/react';
import { useState } from 'react';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
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
      borderRadius="md"
      bgColor={colorMode === "dark" ? "card.background-dark" : "card.background-light"}
    >
      <Skeleton isLoaded={!isLoading}>
        <Image
          src={data.url}
          alt={data.title}
          objectFit="cover"
          w="max"
          h={48}
          borderTopRadius="md"
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
          <Box color={colorMode === "dark" ? "card.color-dark" : "card.color-light"}>
            <Heading fontSize="2xl">{data.title}</Heading>
            <Text mt={2.5} fontSize="md">
              {data.description}
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
}

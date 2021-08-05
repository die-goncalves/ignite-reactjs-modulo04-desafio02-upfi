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
  useBreakpointValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ModalDeleteImage } from './Modal/DeleteImage';
import { ModalUpdateImage } from './Modal/UpdateImage';
import { ButtonFavoriteImage } from './Button/FavoriteImage';

interface Image {
  id: string;
  title: string;
  description: string;
  url: string;
  isFavorite: boolean;
}

interface CardProps {
  data: Image;
  viewImage: (url: string) => void;
}

export function Card({ data, viewImage }: CardProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const { colorMode } = useColorMode();
  const buttonGroupSizes = useBreakpointValue({ base: "xs", sm: "xs", md: "sm", lg: "sm", xl: "sm" });

  return (
    <Box
      position="relative"
      key={data.id}
      bgColor={colorMode === "dark" ? "card.background-dark" : "card.background-light"}
    >
      <Skeleton isLoaded={!isLoading}>
        <Box position="relative">
          <Image
            src={data.url}
            alt={data.title}
            objectFit="cover"
            w="100%"
            h={["10.25rem"]}
            onClick={() => viewImage(data.url)}
            onLoad={() => setIsLoading(false)}
            cursor="pointer"
          />
        </Box>
      </Skeleton>

      <Box pt={3} pb={3} px={4}>
        {isLoading ? (
          <>
            <SkeletonText fontSize="1.125rem" mt={2} noOfLines={1} />
            <SkeletonText fontSize="1rem" mt={7} noOfLines={1} />
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
              <Heading fontSize="1.125rem" fontWeight="bold">{data.title}</Heading>
              <ButtonGroup isAttached size={buttonGroupSizes}>
                <ModalDeleteImage imageId={data.id} />
                <ModalUpdateImage image={data} />
                <ButtonFavoriteImage image={data} />
              </ButtonGroup >
            </Box>
            <Box width="inherit">
              <Text fontSize="1rem">
                {data.description}
              </Text>
            </Box>
          </VStack>
        )}
      </Box>
    </Box>
  );
}

import { Box, Flex, Button, useDisclosure, Icon, IconButton, useColorMode, HStack } from '@chakra-ui/react';
import { RiSunLine, RiMoonLine } from 'react-icons/Ri';
import { ModalAddImage } from './Modal/AddImage';
import { Logo } from './Logo';
import { FavoritesAlbum } from './FavoritesAlbum';

export function Header(): JSX.Element {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box bgColor={colorMode === "dark" ? "header.background-dark" : "header.background-light"}>
        <Flex
          height="12.5vh"
          justifyContent="space-between"
          alignItems="center"
          maxW={1120}
          mx="auto"
          px={20}
        >
          <Logo />
          <HStack spacing="12px">
            <FavoritesAlbum />
            <IconButton
              position="relative"
              variant="toogleIcon-dark/light"
              borderRadius="0.25rem"
              aria-label={colorMode === "dark" ? "Ativar modo escuro" : "Ativar modo claro"}
              title={colorMode === "dark" ? "Ativar modo escuro" : "Ativar modo claro"}
              onClick={toggleColorMode}
              icon={
                <>
                  <Icon
                    as={RiSunLine}
                    role="img"
                    aria-label="sun"
                    position="absolute"
                    opacity={colorMode === "dark" ? 1 : 0}
                    w={6}
                    h={6}
                    transition="all 0.5s ease"
                    transform={colorMode === "dark" ? "rotateZ(0deg)" : "rotateZ(180deg) scale(0.75, 0.75)"}
                  />
                  <Icon
                    as={RiMoonLine}
                    role="img"
                    aria-label="moon"
                    position="absolute"
                    opacity={colorMode === "dark" ? 0 : 1}
                    w={6}
                    h={6}
                    transition="all 0.5s ease"
                    transform={colorMode === "dark" ? "rotateZ(180deg) scale(0.75, 0.75)" : "rotateZ(0deg)"}
                  />
                </>
              }
            />

            <Button
              onClick={() => onOpen()}
              variant="orange-dark/light"
            >
              Adicionar imagem
            </Button>
          </HStack>
        </Flex>
      </Box>

      <ModalAddImage isOpen={isOpen} onClose={onClose} />
    </>
  );
}

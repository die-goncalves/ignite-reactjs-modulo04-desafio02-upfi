import { Box, Flex, Button, useDisclosure, Icon, IconButton, useColorMode, HStack, ButtonGroup, useBreakpointValue } from '@chakra-ui/react';
import { RiSunLine, RiMoonLine, RiAddLine, RiAddFill, RiImageAddFill } from 'react-icons/Ri';
import { VscAdd } from 'react-icons/vsc';
import { ModalAddImage } from './Modal/AddImage';
import { Logo } from './Logo';
import { FavoritesAlbum } from './FavoritesAlbum';

export function Header(): JSX.Element {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const buttonGroupSizes = useBreakpointValue({ base: "xs", sm: "sm", md: "sm", lg: "sm", xl: "sm" });

  return (
    <>
      <Box bgColor={colorMode === "dark" ? "header.background-dark" : "header.background-light"}>
        <Flex
          height="12.5vh"
          justifyContent="space-between"
          alignItems="center"
          maxW={1440}
          mx="auto"
          px={["1rem", "1.125rem", "1.5rem", "2.5rem"]}
        >
          <Logo />

          <ButtonGroup size={buttonGroupSizes} spacing={[0, "0.375rem"]}>
            <FavoritesAlbum />
            <IconButton
              position="relative"
              variant="toogleIcon-dark/light"
              borderRadius={["0", "0.25rem"]}
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
                    w={["1.2860625rem", "1.35375rem", "1.425rem", "1.5rem", "1.575rem"]}
                    h={["1.2860625rem", "1.35375rem", "1.425rem", "1.5rem", "1.575rem"]}
                    transition="all 0.5s ease"
                    transform={colorMode === "dark" ? "rotateZ(0deg)" : "rotateZ(180deg) scale(0.75, 0.75)"}
                  />
                  <Icon
                    as={RiMoonLine}
                    role="img"
                    aria-label="moon"
                    position="absolute"
                    opacity={colorMode === "dark" ? 0 : 1}
                    w={["1.2860625rem", "1.35375rem", "1.425rem", "1.5rem", "1.575rem"]}
                    h={["1.2860625rem", "1.35375rem", "1.425rem", "1.5rem", "1.575rem"]}
                    transition="all 0.5s ease"
                    transform={colorMode === "dark" ? "rotateZ(180deg) scale(0.75, 0.75)" : "rotateZ(0deg)"}
                  />
                </>
              }
            />

            <Button
              display={["none", "initial"]}
              onClick={() => onOpen()}
              variant="orange-dark/light"
            >
              Adicionar imagem
            </Button>
            <IconButton
              display={["initial", "none"]}
              onClick={() => onOpen()}
              variant="toogleIcon-dark/light"
              aria-label="Adicionar imagem"
              borderRadius="0 0.25rem 0.25rem 0"
              icon={<Icon as={RiImageAddFill} w="1.2860625rem" h="1.2860625rem" />}
            />
          </ButtonGroup>
        </Flex>
      </Box>

      <ModalAddImage isOpen={isOpen} onClose={onClose} />
    </>
  );
}

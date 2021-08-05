import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
  useColorMode,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  const { colorMode } = useColorMode();

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent
          bg={colorMode === "dark" ? "modal.background-dark" : "modal.background-light"}
          color={colorMode === "dark" ? "modal.color-dark" : "modal.color-light"}
          borderRadius="none"
          maxWidth="fit-content"
        >
          <ModalBody
            padding="0"
          >
            <Image
              maxWidth="75vw"
              maxHeight="75vh"
              src={imgUrl}
            />
          </ModalBody>

          <ModalFooter
            paddingX="2.5"
            paddingY="2"
          >
            <Link
              href={imgUrl}
              isExternal
              marginRight="auto"
            >
              Abrir original
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

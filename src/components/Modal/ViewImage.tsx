import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
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
          bg="pGray.800"
          borderRadius="0rem 0rem 0.375rem 0.375rem"
          maxWidth="fit-content"
        >
          <ModalBody
            padding="0"
          >
            <Image
              maxWidth="900px"
              maxHeight="600px"
              src={imgUrl}
            />
          </ModalBody>

          <ModalFooter
            paddingX="2.5"
            paddingY="2"
            borderRadius="0rem 0rem 0.375rem 0.375rem"
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

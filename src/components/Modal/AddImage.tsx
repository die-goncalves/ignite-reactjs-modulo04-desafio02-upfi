import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useColorMode,
} from '@chakra-ui/react';

import { FormAddImage } from '../Form/FormAddImage';

interface ModalAddImageProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalAddImage({
  isOpen,
  onClose,
}: ModalAddImageProps): JSX.Element {
  const { colorMode } = useColorMode();
  const handleCloseModal = (): void => {
    onClose();
  };

  return (
    <Modal
      closeOnOverlayClick={false}
      blockScrollOnMount={true}
      isOpen={isOpen}
      onClose={handleCloseModal}
      isCentered
      size="4xl"
    >
      <ModalOverlay />
      <ModalContent
        bgColor={colorMode === "dark" ? "modal.background-dark" : "modal.background-light"}
        color={colorMode === "dark" ? "modal.color-dark" : "modal.color-light"}
        borderRadius="none"
      >
        <ModalHeader fontSize="4xl">Nova imagem</ModalHeader>

        <ModalCloseButton borderRadius="0.25rem" />

        <ModalBody px={60}>
          <FormAddImage closeModal={handleCloseModal} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

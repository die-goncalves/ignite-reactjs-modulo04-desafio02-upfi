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
    <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered size="4xl">
      <ModalOverlay />
      <ModalContent bgColor={colorMode === "dark" ? "modalAddImage.background-dark" : "modalAddImage.background-light"}>
        <ModalHeader fontSize="4xl">Nova imagem</ModalHeader>

        <ModalCloseButton />

        <ModalBody px={60}>
          <FormAddImage closeModal={handleCloseModal} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

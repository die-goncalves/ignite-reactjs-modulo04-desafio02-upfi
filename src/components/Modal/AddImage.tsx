import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useColorMode,
  useBreakpointValue,
  Flex,
  Text,
  CloseButton,
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
  const modalVersions = useBreakpointValue({ base: "xs", sm: "sm", md: "md", lg: "lg", xl: "xl" })

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
      size={modalVersions}
    >
      <ModalOverlay />
      <ModalContent
        bgColor={colorMode === "dark" ? "modal.background-dark" : "modal.background-light"}
        color={colorMode === "dark" ? "modal.color-dark" : "modal.color-light"}
        borderRadius="none"
      >
        <ModalHeader
          padding={[4, 5, 6, 7, 8]}
        >
          <Flex alignItems="center" justifyContent="space-between">
            <Text fontWeight="bold">Nova imagem</Text>
            <CloseButton
              onClick={onClose}
              borderRadius="0.25rem"
            />
          </Flex>
        </ModalHeader>

        <ModalBody
          paddingTop={0}
          paddingBottom={[4, 5, 6, 7, 8]}
          paddingX={[4, 5, 6, 7, 8]}
        >
          <FormAddImage closeModal={handleCloseModal} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

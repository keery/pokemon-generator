import React from "react";
import {
  Modal as ModalChakra,
  ModalProps,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
} from "@chakra-ui/react";

interface Props extends Omit<ModalProps, "isOpen" | "onClose"> {
  title?: string;
  button: React.ReactElement;
  children: React.ReactNode;
  withCloseButton?: boolean;
}

const Modal = ({
  button,
  children,
  title,
  withCloseButton = false,
  ...rest
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box as="span" onClick={onOpen}>
        {button}
      </Box>
      <ModalChakra isOpen={isOpen} onClose={onClose} isCentered {...rest}>
        <ModalOverlay />
        <ModalContent py={5}>
          {title && <ModalHeader>{title}</ModalHeader>}
          {withCloseButton && <ModalCloseButton />}
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </ModalChakra>
    </>
  );
};

export default Modal;

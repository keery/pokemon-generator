import React from "react";
import {
  Modal as ModalChakra,
  ModalProps,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

interface Props extends ModalProps {
  title?: string;
  button?: React.ReactElement;
  children: React.ReactNode;
  withCloseButton?: boolean;
}

const Modal = ({
  onClose,
  isOpen,
  button = null,
  children,
  title,
  withCloseButton = false,
  ...rest
}: Props) => {
  return (
    <>
      {button}
      <ModalChakra isOpen={isOpen} onClose={onClose} isCentered {...rest}>
        <ModalOverlay />
        <ModalContent py={5} mx={2}>
          {title && <ModalHeader>{title}</ModalHeader>}
          {withCloseButton && <ModalCloseButton />}
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </ModalChakra>
    </>
  );
};

export default Modal;

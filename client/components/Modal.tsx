import React from "react";
import {
  Modal as ModalChakra,
  ModalProps,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { closeModalWithUrl } from "~utils/helper";

interface Props extends Omit<ModalProps, "isOpen"> {
  name: string;
  title?: string;
  button?: React.ReactElement;
  children: React.ReactNode;
  footer?: JSX.Element;
  withCloseButton?: boolean;
}

const Modal = ({
  name,
  onClose,
  button = null,
  children,
  title,
  withCloseButton = false,
  footer,
  ...rest
}: Props) => {
  const router = useRouter();

  return (
    <>
      {button}
      <ModalChakra
        isOpen={router.query?.modal === name}
        onClose={() => closeModalWithUrl(onClose)}
        isCentered
        {...rest}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent py={5} w="96%" maxH="95vh">
          {title && <ModalHeader>{title}</ModalHeader>}
          {withCloseButton && <ModalCloseButton zIndex={9} />}
          <ModalBody>{children}</ModalBody>
          {footer && <ModalFooter>{footer}</ModalFooter>}
        </ModalContent>
      </ModalChakra>
    </>
  );
};

export default Modal;

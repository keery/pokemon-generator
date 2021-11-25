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
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { closeModalWithUrl } from "~utils/helper";

interface Props extends ModalProps {
  name?: string;
  title?: string;
  button?: React.ReactElement | React.ReactNode;
  children: React.ReactNode;
  footer?: JSX.Element;
  withCloseButton?: boolean;
}

const Modal = ({
  name = "",
  onClose,
  button = null,
  children,
  title,
  withCloseButton = false,
  footer,
  isOpen = false,
  ...rest
}: Props) => {
  const router = useRouter();
  const style = useColorModeValue(
    {},
    {
      layerStyle: "nes-container",
      borderRadius: "none",
      px: "0",
    }
  );

  const headerFontsize = useColorModeValue(
    { base: "md", sm: "lg", md: "xl" },
    { base: "xs", sm: "sm", md: "md" }
  );

  return (
    <>
      {button}
      <ModalChakra
        isOpen={router.query?.modal === name || isOpen}
        onClose={() => closeModalWithUrl(onClose)}
        isCentered
        {...rest}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent
          py={5}
          w="96%"
          maxH="95vh"
          {...style}
          color="text"
          bgColor="white"
        >
          {title && (
            <ModalHeader fontSize={headerFontsize}>{title}</ModalHeader>
          )}
          {withCloseButton && <ModalCloseButton color="text" zIndex={9} />}
          <ModalBody>{children}</ModalBody>
          {footer && <ModalFooter>{footer}</ModalFooter>}
        </ModalContent>
      </ModalChakra>
    </>
  );
};

export default Modal;

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
  title?: string | JSX.Element;
  button?: React.ReactElement | React.ReactNode;
  children: React.ReactNode;
  footer?: JSX.Element;
  withCloseButton?: boolean;
  isUrlChanging?: boolean;
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
  isUrlChanging = true,
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
    { base: "md", sm: "lg", md: "1.6rem" },
    { base: "xs", sm: "sm", md: "md" }
  );

  return (
    <>
      {button}
      <ModalChakra
        isOpen={router.query?.modal === name || isOpen}
        onClose={() => {
          if (isUrlChanging) {
            closeModalWithUrl(onClose);
          } else {
            onClose();
          }
        }}
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
          color="white"
          backdropFilter="blur(25px) saturate(180%)"
          backgroundColor="rgb(20 27 40 / 60%)"
        >
          {title && (
            <ModalHeader
              fontSize={headerFontsize}
              fontWeight="800"
              noOfLines={3}
              maxH="135px"
              overflow="inherit"
            >
              {title}
            </ModalHeader>
          )}
          {withCloseButton && <ModalCloseButton color="white" zIndex={9} />}
          <ModalBody>{children}</ModalBody>
          {footer && <ModalFooter>{footer}</ModalFooter>}
        </ModalContent>
      </ModalChakra>
    </>
  );
};

export default Modal;

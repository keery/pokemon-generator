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
import { useRouter, useSearchParams } from "next/navigation";
import useModalWithUrl from "~hooks/useModalWithUrl";

interface Props extends Omit<ModalProps, "isOpen"> {
  name?: string;
  title?: string | JSX.Element;
  button?: React.ReactElement | React.ReactNode;
  children: React.ReactNode;
  footer?: JSX.Element;
  withCloseButton?: boolean;
  isUrlChanging?: boolean;
  isOpen?: boolean;
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
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  const { onCloseModalWithUrl } = useModalWithUrl({ name, onClose });

  return (
    <>
      {button}
      <ModalChakra
        isOpen={modal === name || isOpen}
        onClose={() => {
          if (isUrlChanging) {
            onCloseModalWithUrl();
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
          color="white"
          backdropFilter="blur(25px) saturate(180%)"
          backgroundColor="rgb(20 27 40 / 60%)"
        >
          {title && (
            <ModalHeader
              fontSize={{ base: "md", sm: "lg", md: "1.6rem" }}
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

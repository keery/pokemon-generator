import React from "react";
import { Flex, FlexProps } from "@chakra-ui/react";

interface Props extends FlexProps {
  onDelete: () => void;
  onOpen: () => void;
}

const ModalResizeImgButton = ({ onDelete, onOpen, ...rest }: Props) => {
  return (
    <Flex
      userSelect="none"
      onClick={onOpen}
      onTouchStart={onOpen}
      cursor="pointer"
      position="absolute"
      {...rest}
    />
  );
};

export default ModalResizeImgButton;

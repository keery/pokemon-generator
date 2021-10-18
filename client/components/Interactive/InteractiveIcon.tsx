import React from "react";
import { IconButton, IconButtonProps } from "@chakra-ui/react";

const InteractiveIcon = ({ icon, onClick, ...rest }: IconButtonProps) => {
  return (
    <IconButton
      p={0}
      minW="none"
      w="auto"
      h="auto"
      onClick={onClick}
      icon={icon}
      layerStyle="glass"
      fontSize="1.3rem"
      {...rest}
    />
  );
};

export default InteractiveIcon;

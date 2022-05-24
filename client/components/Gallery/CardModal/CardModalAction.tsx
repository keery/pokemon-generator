import React, { PropsWithChildren } from "react";
import { Button } from "@chakra-ui/react";

type Props = PropsWithChildren<{
  onClick: () => void;
}>;

const CardModalAction = ({ children, onClick }: Props) => {
  return (
    <Button
      onClick={onClick}
      borderRadius="full"
      bgColor="transparent"
      border="1px solid"
      borderColor="gray.400"
      padding="0"
      w="3.5rem"
      h="3.5rem"
      fontSize="1.4rem"
      _active={{
        transform: "scale(0.9)",
      }}
      transitionDuration="200ms"
    >
      {children}
    </Button>
  );
};

export default CardModalAction;

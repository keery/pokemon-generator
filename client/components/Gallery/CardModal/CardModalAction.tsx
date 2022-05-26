import React, { PropsWithChildren } from "react";
import { Button } from "@chakra-ui/react";

type Props = PropsWithChildren<{
  name: string;
  onClick: () => void;
  onHover: (target: string | null) => void;
  isHidden: boolean;
}>;

const CardModalAction = ({
  children,
  onClick,
  onHover,
  name,
  isHidden,
}: Props) => {
  return (
    <Button
      onMouseEnter={() => onHover(name)}
      onMouseLeave={() => onHover(null)}
      onClick={onClick}
      borderRadius="full"
      bgColor="transparent"
      border="1px solid"
      borderColor="gray.400"
      opacity={isHidden ? 0.4 : 1}
      padding="0"
      w="3.5rem"
      h="3.5rem"
      fontSize="1.4rem"
      _active={{
        transform: "scale(0.9)",
      }}
      _hover={{
        backgroundColor: "#646571",
        borderColor: "#646571",
      }}
      transitionDuration="200ms"
    >
      {children}
    </Button>
  );
};

export default CardModalAction;

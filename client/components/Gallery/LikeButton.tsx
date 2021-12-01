import React from "react";
import { Button, ButtonProps } from "@chakra-ui/react";
import Heart from "public/assets/img/heart.svg";

const LikeButton = (props: ButtonProps) => {
  return (
    <Button
      minW="0"
      h="auto"
      variant="unstyled"
      color="#9e9ea7"
      {...props}
      cursor="pointer"
      _hover={{
        color: "#ea4c89",
      }}
      _active={{
        transform: "scale(0.9)",
      }}
    >
      <Heart width="15px" className="heart-icon" />
    </Button>
  );
};

export default LikeButton;

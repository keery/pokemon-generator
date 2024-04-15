import React from "react";
import { Image } from "@chakra-ui/react";

const Backface = () => {
  return (
    <Image
      className="backface"
      src="/assets/img/pokemon-card-back.webp"
      position="absolute"
      left="0"
      top="0"
      right="0"
      bottom="0"
      backgroundSize="100%"
      transform="rotateY(180deg)"
      alt="Backface card"
    />
  );
};

export default Backface;

import React from "react";
import { Flex } from "@chakra-ui/react";
import { Blurhash } from "react-blurhash";

interface Props {
  blurhash: string;
}

const CardBlurhash = ({ blurhash }: Props) => {
  return (
    <Flex layerStyle="cover" borderRadius="1.4rem">
      <Blurhash
        hash={blurhash}
        resolutionX={32}
        resolutionY={32}
        width="100%"
        punch={1}
        height="100%"
      />
    </Flex>
  );
};

export default CardBlurhash;

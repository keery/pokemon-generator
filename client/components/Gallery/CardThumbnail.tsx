import React from "react";
import { Card } from "~@types/Card";
import { Image, Flex, AspectRatio, AspectRatioProps } from "@chakra-ui/react";
import { Blurhash } from "react-blurhash";

interface Props extends AspectRatioProps {
  card: Card;
}

const CardThumbnail = ({ card, ...rest }: Props) => {
  return (
    <AspectRatio ratio={500 / 700} pos="relative" {...rest}>
      <Image
        src={card.img}
        fallback={
          <Flex
            pos="absolute"
            left={0}
            right={0}
            top={0}
            bottom={0}
            borderRadius="1rem"
          >
            <Blurhash
              hash={card.blurHash}
              resolutionX={32}
              resolutionY={32}
              width="100%"
              punch={1}
              height="100%"
            />
          </Flex>
        }
      />
    </AspectRatio>
  );
};

export default CardThumbnail;

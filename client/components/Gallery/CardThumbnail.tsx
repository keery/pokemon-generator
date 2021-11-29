import React from "react";
import { Card } from "~@types/Card";
import { Image, Flex, AspectRatio, Circle, Text } from "@chakra-ui/react";
import { Blurhash } from "react-blurhash";
import LikesCounter from "~components/Gallery/LikesCounter";

interface Props {
  card: Card;
}

const CardThumbnail = ({ card }: Props) => {
  return (
    <Flex direction="column">
      <AspectRatio ratio={500 / 700} pos="relative">
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
      <Flex pt={2} px={1} justifyContent="space-between" alignItems="center">
        <Flex alignItems="center">
          <Circle
            size="25px"
            bg="linear-gradient(to right top, rgb(6, 249, 168), rgb(168, 6, 249))"
            mr={2}
            border="2px solid white"
            boxShadow="rgb(0 0 0 / 10%) 0px 10px 15px -3px, rgb(0 0 0 / 5%) 0px 4px 6px -2px"
          />
          <Text fontSize="xs" fontWeight="bold">
            Guillaume E.
          </Text>
        </Flex>
        <LikesCounter />
      </Flex>
    </Flex>
  );
};

export default CardThumbnail;

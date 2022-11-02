import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import LikeButtonRound from "~components/Gallery/LikeButtonRound";
import { Card } from "~@types/Card";
import { CachedQuery } from "~@types/CachedQuery";

interface Props {
  card: Card;
  cachedQuery: CachedQuery;
}

const LikesCounter = ({ card, cachedQuery }: Props) => {
  return (
    <Flex alignItems="center">
      <LikeButtonRound card={card} cachedQuery={cachedQuery} />
      <Text
        pl={1}
        fontSize="0.8rem"
        fontWeight="bold"
        color="#3d3d4e"
        minW="15px"
        textAlign="right"
      >
        {card.likes}
      </Text>
    </Flex>
  );
};

export default LikesCounter;

import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import LikeButtonRound from "~components/Gallery/LikeButtonRound";
import { Card, CachedQuery } from "~@types";

interface Props {
  card: Card;
  cachedQuery: CachedQuery;
}

const LikesCounter = ({ card, cachedQuery }: Props) => {
  return (
    <Flex alignItems="center" pl={5}>
      <Text
        pr={3}
        color="white"
        fontSize="1.2rem"
        minW="15px"
        textAlign="right"
      >
        {card.likes}
      </Text>
      <LikeButtonRound card={card} cachedQuery={cachedQuery} />
    </Flex>
  );
};

export default LikesCounter;

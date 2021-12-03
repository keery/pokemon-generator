import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import LikeButton from "~components/Gallery/LikeButton";
import { Card } from "~@types/Card";

interface Props {
  card: Card;
  queryKey: any[];
  indexPage: number;
}

const LikesCounter = ({ card, queryKey, indexPage }: Props) => {
  return (
    <Flex alignItems="center">
      <LikeButton card={card} queryKey={queryKey} indexPage={indexPage} />
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

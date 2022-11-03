import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { Card, CachedQuery } from "~@types";
import LikesCounter from "~components/Gallery/LikesCounter";
import { useTranslation } from "next-i18next";

interface Props {
  card: Card;
  cachedQuery: CachedQuery;
}

const CardThumbnailGlass = ({ card, cachedQuery }: Props) => {
  const { t } = useTranslation("gallery");

  return (
    <Flex
      backgroundColor="rgb(20 27 40 / 60%)"
      backdropFilter="blur(8px)"
      pos="absolute"
      bottom="0"
      left="0"
      right="0"
      zIndex={10}
      border="none"
      justifyContent="space-between"
      color="white"
      p="1rem 1.5rem"
      transition="opacity ease-in-out 200ms"
      opacity="0"
      _groupHover={{
        opacity: "1",
      }}
    >
      <Flex direction="column" maxW="70%">
        <Text fontWeight="bold" mb={1} fontSize="1.4rem" layerStyle="ellipsis">
          {card.name}
        </Text>
        <Text fontSize="0.8rem" layerStyle="ellipsis">
          {t("madeBy", { name: card.author })}
        </Text>
      </Flex>

      <LikesCounter card={card} cachedQuery={cachedQuery} />
    </Flex>
  );
};

export default CardThumbnailGlass;

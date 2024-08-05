import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { Card, CachedQuery } from "~@types";
import LikesCounter from "~components/Gallery/LikesCounter";
import { useTranslations } from "next-intl";

interface Props {
  card: Card;
  cachedQuery: CachedQuery;
}

const CardThumbnailGlass = ({ card, cachedQuery }: Props) => {
  const { t } = useTranslation("gallery");

  return (
    <Flex
      border="none"
      justifyContent="space-between"
      color="white"
      p="0.3rem 0.4rem"
    >
      <Flex direction="column" maxW="70%">
        <Text
          fontWeight="bold"
          mb={0.5}
          fontSize="1.4rem"
          layerStyle="ellipsis"
          lineHeight="1"
          marginTop="0.3rem"
        >
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

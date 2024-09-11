import React from "react";
import { Image } from "@chakra-ui/react";
import CardBlurhash from "~components/Gallery/CardBlurhash";
import { Card } from "~@types/Card";
import { getUrlToDisplayCard } from "~utils/card";

interface Props {
  card: Card;
  id?: string | null;
}

const CardImage = ({ card, id = null }: Props) => {
  const url = getUrlToDisplayCard(card);

  return (
    <Image
      fallback={<CardBlurhash blurhash={card.blurHash} />}
      src={url}
      maxH="100%"
      referrerPolicy="no-referrer"
    />
  );
};

export default CardImage;

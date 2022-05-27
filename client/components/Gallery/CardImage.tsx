import React from "react";
import { Image } from "@chakra-ui/react";
import CardBlurhash from "~components/Gallery/CardBlurhash";
import { Card } from "~@types/Card";

interface Props {
  card: Card;
}

const CardImage = ({ card }: Props) => {
  return (
    <Image
      id="img-card-modal"
      fallback={<CardBlurhash blurhash={card.blurHash} />}
      src={card.img}
      maxH="100%"
    />
  );
};

export default CardImage;

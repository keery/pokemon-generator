import React from "react";
import { Image } from "@chakra-ui/react";
import CardBlurhash from "~components/Gallery/CardBlurhash";
import { Card } from "~@types/Card";

interface Props {
  card: Card;
}

const CardImage = ({ card }: Props) => {
  const urlParams = new URLSearchParams(card.img);
  const cardId = urlParams.get("id");

  return (
    <Image
      fallback={<CardBlurhash blurhash={card.blurHash} />}
      // TODO: To fix when a normal url is found
      src={`https://drive.google.com/thumbnail?id=${cardId}&sz=w1000`}
      maxH="100%"
      referrerPolicy="no-referrer"
    />
  );
};

export default CardImage;

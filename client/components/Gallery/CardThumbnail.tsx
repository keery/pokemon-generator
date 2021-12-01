import React from "react";
import { AspectRatio, Image, ImageProps, LinkBox } from "@chakra-ui/react";
import { Card } from "~@types/Card";
import LinkOverlay from "~components/LinkOverlay";
import CardBlurhash from "~components/Gallery/CardBlurhash";
import { ROUTE_GALLERY } from "~constants";
import { motion } from "framer-motion";
import { cardModalAtom } from "~atoms/card-modal";
import { useSetRecoilState } from "recoil";

interface Props {
  card: Card;
}

export const MotionImage = motion<ImageProps>(Image);

const CardThumbnail = ({ card }: Props) => {
  const setCard = useSetRecoilState(cardModalAtom);

  return (
    <LinkBox>
      <LinkOverlay
        href={`${ROUTE_GALLERY}?cardSlug=${card.slug}&idCard=${card.id}`}
        as={`${ROUTE_GALLERY}/${card.slug}/${card.id}`}
        _before={{ zIndex: 12 }}
        onClick={() => {
          setCard({ card });
        }}
      />
      <motion.div
        layoutId={`card-container-${card.id}`}
        transition={{ ease: "linear", duration: 0.1 }}
        style={{
          position: "relative",
          zIndex: 9,
          cursor: "pointer",
        }}
      >
        <AspectRatio
          as={motion.div}
          layoutId={`card-image-container-${card.id}`}
          ratio={500 / 700}
          pos="relative"
          borderRadius="1.4rem"
          overflow="hidden"
          transform="translateZ(0)"
        >
          <MotionImage
            // @ts-ignore
            transition={{ ease: "linear", duration: 0.1 }}
            layoutId={`card-image-${card.id}`}
            style={{
              position: "absolute",
              left: "0",
              top: "0",
            }}
            src={card.img}
            fallback={<CardBlurhash blurhash={card.blurHash} />}
          />
        </AspectRatio>
      </motion.div>
    </LinkBox>
  );
};

export default CardThumbnail;

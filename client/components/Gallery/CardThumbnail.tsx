import React from "react";
import { AspectRatio, LinkBox } from "@chakra-ui/react";
import LinkOverlay from "~components/LinkOverlay";
import { getHrefCardModal } from "~utils/card";
import CardImage from "~components/Gallery/CardImage";
import { motion } from "framer-motion";
import { cardModalAtom } from "~atoms/card-modal";
import { useSetRecoilState } from "recoil";
import { CachedQuery, Card } from "~@types";

interface Props {
  card: Card;
  layoutPrefix?: string;
  cachedQuery: CachedQuery;
}

const CardThumbnail = ({ card, cachedQuery, layoutPrefix = "" }: Props) => {
  const setCard = useSetRecoilState(cardModalAtom);
  const { href, as } = getHrefCardModal(card, layoutPrefix);

  return (
    <LinkBox
      role="group"
      as={motion.div}
      whileTap={{
        scale: 0.9,
      }}
    >
      <LinkOverlay
        shallow
        href={href}
        as={as}
        _before={{ zIndex: 12 }}
        onClick={() => {
          setCard({ card, cachedQuery });
        }}
      />
      <motion.div
        transition={{ ease: "linear", duration: 0.1 }}
        style={{
          position: "relative",
          zIndex: 9,
          cursor: "pointer",
        }}
      >
        <AspectRatio
          as={motion.div}
          ratio={500 / 700}
          pos="relative"
          borderRadius="1.4rem"
          overflow="hidden"
          transform="translateZ(0)"
        >
          <motion.div
            // @ts-ignore
            transition={{ ease: "linear", duration: 0.1 }}
            style={{
              position: "absolute",
              left: "0",
              top: "0",
            }}
          >
            <CardImage card={card} />
          </motion.div>
        </AspectRatio>
      </motion.div>
    </LinkBox>
  );
};

export default CardThumbnail;

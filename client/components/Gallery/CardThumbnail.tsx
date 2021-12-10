import React from "react";
import { AspectRatio, Image, LinkBox, Box } from "@chakra-ui/react";
import { Card } from "~@types/Card";
import LinkOverlay from "~components/LinkOverlay";
import { getHrefCardModal } from "~utils/card";
import CardBlurhash from "~components/Gallery/CardBlurhash";
import { motion } from "framer-motion";
import { cardModalAtom } from "~atoms/card-modal";
import { useSetRecoilState } from "recoil";

interface Props {
  card: Card;
  layoutPrefix?: string;
}

const CardThumbnail = ({ card, layoutPrefix = "" }: Props) => {
  const setCard = useSetRecoilState(cardModalAtom);
  const { href, as } = getHrefCardModal(card, layoutPrefix);

  return (
    <LinkBox role="group">
      <LinkOverlay
        shallow
        href={href}
        as={as}
        _before={{ zIndex: 12 }}
        onClick={() => {
          setCard({ card });
        }}
      />
      <motion.div
        layoutId={`card-container-${layoutPrefix}${card.id}`}
        transition={{ ease: "linear", duration: 0.1 }}
        style={{
          position: "relative",
          zIndex: 9,
          cursor: "pointer",
        }}
      >
        <Box
          pos="absolute"
          left="50%"
          top="50%"
          transition="transform cubic-bezier(.4,0,.2,1) 400ms"
          transform="translateY(-50%) translateX(-50%) scale(0)"
          _groupHover={{
            transform: "translateY(-50%) translateX(-50%) scale(1)",
          }}
          w="105%"
          h="105%"
        >
          <Box
            borderRadius="1.4rem"
            animation="floatWobble 5s ease-in-out infinite"
            w="100%"
            bgColor="pokeball"
            h="100%"
            layerStyle="glass"
          />
        </Box>
        <AspectRatio
          as={motion.div}
          layoutId={`card-image-container-${layoutPrefix}${card.id}`}
          ratio={500 / 700}
          pos="relative"
          borderRadius="1.4rem"
          overflow="hidden"
          transform="translateZ(0)"
        >
          <motion.div
            // @ts-ignore
            transition={{ ease: "linear", duration: 0.1 }}
            layoutId={`card-image-${layoutPrefix}${card.id}`}
            style={{
              position: "absolute",
              left: "0",
              top: "0",
            }}
          >
            <Image
              fallback={<CardBlurhash blurhash={card.blurHash} />}
              src={card.img}
            />
          </motion.div>
        </AspectRatio>
      </motion.div>
    </LinkBox>
  );
};

export default CardThumbnail;

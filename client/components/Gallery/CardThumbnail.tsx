import React, { useState } from "react";
import { AspectRatio, Box } from "@chakra-ui/react";
import { getHrefCardModal } from "~utils/card";
import CardImage from "~components/Gallery/CardImage";
import CardThumbnailGlass from "~components/Gallery/CardThumbnailGlass";
import Link from "~components/Link";
import { m } from "framer-motion";
import { cardModalAtom } from "~atoms/card-modal";
import { useSetRecoilState } from "recoil";
import { CachedQuery, Card } from "~@types";
import { MutateLikeFunction } from "~@types/MutateLikeFunction";

interface Props {
  card: Card;
  layoutPrefix?: string;
  cachedQuery: CachedQuery;
  onMutate: MutateLikeFunction;
}

const CardThumbnail = ({
  card,
  cachedQuery,
  layoutPrefix = "",
  onMutate,
}: Props) => {
  const setCard = useSetRecoilState(cardModalAtom);
  const { href, as } = getHrefCardModal(card, layoutPrefix);
  const [isVisible, setVisible] = useState(true);

  return (
    <Box
      pos="relative"
      overflow="hidden"
      borderBottomRadius="1.2rem"
      role="group"
    >
      <Link
        shallow
        as={as}
        href={href}
        onClick={() => {
          setCard({ card, cachedQuery, onMutate });
        }}
      >
        <m.div
          transition={{ ease: "linear", duration: 0.1 }}
          style={{
            position: "relative",
            zIndex: 9,
            cursor: "pointer",
          }}
          whileTap={{
            scale: 0.9,
          }}
          onTapStart={() => setVisible(false)}
          onTap={() => {
            setTimeout(() => {
              setVisible(true);
            }, 1000);
          }}
        >
          <AspectRatio
            as={m.div}
            ratio={500 / 700}
            pos="relative"
            borderRadius="1.4rem"
            overflow="hidden"
            transform="translateZ(0)"
          >
            <Box
              as={m.div}
              // @ts-ignore
              transition={{ ease: "linear", duration: 0.1 }}
              style={{
                position: "absolute",
                left: "0",
                top: "0",
              }}
            >
              <CardImage card={card} />
            </Box>
          </AspectRatio>
        </m.div>
      </Link>
      {isVisible && (
        <CardThumbnailGlass
          card={card}
          cachedQuery={cachedQuery}
          onMutate={onMutate}
        />
      )}
    </Box>
  );
};

export default CardThumbnail;

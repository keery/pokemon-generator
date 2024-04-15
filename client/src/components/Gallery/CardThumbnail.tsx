import React, { useState } from "react";
import { AspectRatio, Box } from "@chakra-ui/react";
import { getHrefCardModal } from "~utils/card";
import CardImage from "~src/components/Gallery/CardImage";
import CardThumbnailGlass from "~src/components/Gallery/CardThumbnailGlass";
import Link from "~src/components/Link";
import { m } from "framer-motion";
import { cardModalAtom } from "~atoms/card-modal";
import { useSetRecoilState } from "recoil";
import { CachedQuery, Card } from "~@types";
import { setCardListData } from "~utils/setCardListData";

interface Props {
  card: Card;
  layoutPrefix?: string;
  cachedQuery: CachedQuery;
}

const CardThumbnail = ({ card, cachedQuery, layoutPrefix = "" }: Props) => {
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
          setCard({ card, cachedQuery, onMutate: setCardListData });
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
        >
          <AspectRatio
            as={m.div}
            ratio={500 / 700}
            pos="relative"
            borderRadius="15px"
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

      <CardThumbnailGlass card={card} cachedQuery={cachedQuery} />
    </Box>
  );
};

export default CardThumbnail;

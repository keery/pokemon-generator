import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { AspectRatio, Box, Image } from "@chakra-ui/react";
import CardModalOverlay from "~components/Gallery/CardModalOverlay";
import { cardModalAtom } from "~atoms/card-modal";
import { useRecoilValue } from "recoil";
import { Card } from "~@types/Card";
import { getSeoCardDescription } from "~utils/card";
import { NextSeo } from "next-seo";

interface Props {
  card: Card;
  layoutPrefix?: string;
}

const CardModal = ({ card, layoutPrefix = "" }: Props) => {
  return (
    <>
      <NextSeo title={card.name} description={getSeoCardDescription(card)} />
      <CardModalOverlay />
      <Box
        className="card-content-container is-open"
        zIndex="9000"
        pos="fixed"
        top="0"
        left="0"
        right="0"
        bottom="0"
        m="40px"
      >
        <motion.div
          layoutId={`card-container-${layoutPrefix}${card.id}`}
          transition={{ ease: "linear", duration: 0.3 }}
          style={{
            zIndex: 1000,
            pointerEvents: "auto",
            borderRadius: "20px",
            overflow: "hidden",
            width: "100%",
            height: "100%",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Box
            as={motion.div}
            backgroundColor="blue.100"
            layerStyle="cover"
            animate
            zIndex="-1"
          />
          <AspectRatio
            as={motion.div}
            layoutId={`card-image-container-${layoutPrefix}${card.id}`}
            ratio={500 / 700}
            pos="relative"
            h="100%"
            w="100%"
          >
            <motion.div
              // @ts-ignore
              transition={{ ease: "linear", duration: 0.3 }}
              layoutId={`card-image-${layoutPrefix}${card.id}`}
              style={{
                position: "absolute",
                left: "4%",
                top: "10%",
                width: "fit-content",
                height: "auto",
                bottom: "10%",
              }}
            >
              <Image src={card.img} />
            </motion.div>
          </AspectRatio>
        </motion.div>
      </Box>
    </>
  );
};

const Wrapper = () => {
  const { query } = useRouter();
  const { card } = useRecoilValue(cardModalAtom);

  return (
    <AnimatePresence>
      {query?.idCard && card && (
        <CardModal
          card={card}
          layoutPrefix={query?.layoutPrefix as string}
          key="card-modal"
        />
      )}
    </AnimatePresence>
  );
};

export default Wrapper;

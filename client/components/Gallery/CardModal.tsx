import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { AspectRatio, Box, ImageProps, Image } from "@chakra-ui/react";
import CardModalOverlay from "~components/Gallery/CardModalOverlay";
import { cardModalAtom } from "~atoms/card-modal";
import { useRecoilValue } from "recoil";
import { Card } from "~@types/Card";

export const MotionImage = motion<ImageProps>(Image);

interface Props {
  card?: Card;
}

const CardModal = ({ card }: Props) => {
  return (
    <>
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
          layoutId={`card-container-${card.id}`}
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
          />
          <AspectRatio
            as={motion.div}
            layoutId={`card-image-container-${card.id}`}
            ratio={500 / 700}
            pos="relative"
            h="100%"
            w="100%"
          >
            <MotionImage
              // @ts-ignore
              transition={{ ease: "linear", duration: 0.3 }}
              layoutId={`card-image-${card.id}`}
              style={{
                position: "absolute",
                left: "4%",
                top: "10%",
                width: "auto",
                height: "auto",
                bottom: "10%",
              }}
              src={card.img}
            />
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
      {query?.idCard && card && <CardModal card={card} key="card-modal" />}
    </AnimatePresence>
  );
};

export default Wrapper;

import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import { getHrefCardModal } from "~utils/card";
import { setWinnerData } from "~utils/setWinnerData";
import Router from "next/router";
import { Winner } from "~@types/Winner";
import { m, MotionValue } from "framer-motion";
import { getKey } from "~hooks/useWinner";
import { cardModalAtom } from "~atoms/card-modal";
import { useSetRecoilState } from "recoil";

const styleReflects: BoxProps = {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  top: 0,
  backgroundRepeat: "no-repeat",
  opacity: 0.5,
  mixBlendMode: "color-dodge",
  transition: "all 0.33s ease",
};

interface Props {
  winner: Winner;
  animationCard?: any;
  animationGradient?: any;
  animationSparkle?: any;
}

const FrontHoloCard = ({
  winner,
  animationCard,
  animationGradient,
  animationSparkle,
}: Props) => {
  const setCard = useSetRecoilState(cardModalAtom);

  const urlParams = new URLSearchParams(winner?.card?.img);
  const cardId = urlParams.get("id");

  return (
    <>
      <Box
        as={m.div}
        h="555px"
        borderRadius="1.3rem"
        className="holo-card"
        position="relative"
        bgImage={
          cardId
            ? `https://drive.google.com/thumbnail?id=${cardId}&sz=w1000`
            : "none"
        }
        // bgImage={winner?.card?.img || "none"}
        zIndex="10"
        transition="box-shadow 0.2s ease"
        willChange="transform, filter"
        boxShadow="0 55px 35px -20px rgba(0, 0, 0, 0.5)"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        backgroundPosition="50% 50%"
        transformOrigin="center"
        style={{
          animation: animationCard,
        }}
        onClick={() => {
          const { as, href } = getHrefCardModal(winner.card);
          Router.push(href, as, { shallow: true });
          setCard({
            card: winner.card,
            cachedQuery: {
              key: getKey(),
            },
            onMutate: setWinnerData,
          });
        }}
        cursor={winner ? "pointer" : "auto"}
      >
        {!winner && (
          <Box
            pos="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            fontFamily="title"
            fontSize="25rem"
            color="#8fd0fc"
          >
            ?
          </Box>
        )}
        <Box
          as={m.div}
          {...styleReflects}
          backgroundPosition="50% 50%"
          backgroundSize="300% 300%"
          backgroundImage="linear-gradient(
               115deg,
               transparent 0%,
               rgb(0, 231, 255) 25%,
               transparent 47%,
               transparent 53%,
               rgb(255, 0, 231) 75%,
               transparent 100%
             );"
          opacity="0.5"
          filter="brightness(0.5) contrast(1)"
          zIndex="1"
          borderRadius="23px"
          style={{
            animation: animationGradient,
          }}
        />
        <Box
          as={m.div}
          {...styleReflects}
          backgroundImage="
              linear-gradient(
                125deg,
                #ff008450 15%,
                #fca40040 30%,
                #ffff0030 40%,
                #00ff8a20 60%,
                #00cfff40 70%,
                #cc4cfa50 85%
              );"
          backgroundPosition="50% 50%"
          backgroundSize="160%"
          backgroundBlendMode="overlay"
          zIndex="2"
          filter="brightness(1) contrast(1)"
          transition="all 0.33s ease"
          mixBlendMode="color-dodge"
          opacity="0.75"
          borderRadius="23px"
          style={{
            animation: animationSparkle,
          }}
        />
      </Box>
    </>
  );
};

export default FrontHoloCard;

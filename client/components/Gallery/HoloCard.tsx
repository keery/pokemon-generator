import React, { useRef } from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import { m, useTransform, useViewportScroll } from "framer-motion";
import useElementSize from "~hooks/useElementSize";
import useWinner, { getKey } from "~hooks/useWinner";
import { screenPercent } from "~utils/helper";
import { cardModalAtom } from "~atoms/card-modal";
import { useSetRecoilState } from "recoil";
import { getHrefCardModal } from "~utils/card";
import { setWinnerData } from "~utils/setWinnerData";
import Router from "next/router";

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

export const START_ROTATION = 150;
export const END_ROTATION = 170;

const HoloCard = () => {
  const setCard = useSetRecoilState(cardModalAtom);
  const { scrollY } = useViewportScroll();
  const ref = useRef();
  const { width, parentWidth } = useElementSize(ref);
  const { data: winner } = useWinner();

  const y = useTransform(
    scrollY,
    [0, screenPercent(110), screenPercent(END_ROTATION + 20)],
    [screenPercent(25), screenPercent(25), screenPercent(105)]
  );
  const x = useTransform(
    scrollY,
    [0, screenPercent(100), screenPercent(START_ROTATION)],
    [
      screenPercent(-150),
      screenPercent(-150),
      screenPercent(30),
      // -(parentWidth / 2 - width),
    ]
  );
  const z = useTransform(
    scrollY,
    [screenPercent(37), screenPercent(62)],
    [1, 1.15]
  );

  const rotateYBackface = useTransform(
    scrollY,
    [0, screenPercent(START_ROTATION), screenPercent(END_ROTATION)],
    [0, 0, 180]
  );

  const halfRotation =
    (screenPercent(START_ROTATION) + screenPercent(END_ROTATION)) / 2;
  const opacity = useTransform(
    scrollY,
    [halfRotation, halfRotation + 1],
    [0, 1]
  );
  const rotateYFronface = useTransform(
    scrollY,
    [0, screenPercent(START_ROTATION), screenPercent(END_ROTATION)],
    [-180, -180, 0]
  );

  const animationCard = useTransform(scrollY, (value) =>
    value >= screenPercent(END_ROTATION) ? "holoCard 12s ease 0s infinite" : ""
  );

  const animationGradient = useTransform(scrollY, (value) =>
    value >= screenPercent(END_ROTATION)
      ? "holoGradient 12s ease 0s infinite"
      : ""
  );
  const animationSparkle = useTransform(scrollY, (value) =>
    value >= screenPercent(END_ROTATION)
      ? "holoSparkle 12s ease 0s infinite"
      : ""
  );

  return (
    <m.div
      ref={ref}
      className="holo-card-container"
      style={{
        perspective: "2000px",
        position: "absolute",
        zIndex: 10,
        top: "0",
        left: "50%",
        transform: "translate3d(0.1px, 0.1px, 0.1px) translateX(-50%)",
        transformStyle: "preserve-3d",
      }}
    >
      <Box
        as={m.div}
        style={{
          touchAction: "none",
          width: "400px",
          paddingTop: "138.75%",
          y,
          x,
          rotateY: rotateYBackface,
          backfaceVisibility: "hidden",
        }}
        borderRadius="0.4rem"
        className="holo-card"
        position="relative"
        bgImage="/assets/img/pokemon-card-back.webp"
        zIndex="10"
        transition="box-shadow 0.2s ease"
        willChange="transform, filter"
        boxShadow="0 55px 35px -20px rgba(0, 0, 0, 0.5)"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        backgroundPosition="50% 50%"
        transformOrigin="center"
      />
      <Box
        as={m.div}
        style={{
          touchAction: "none",
          y,
          x,
          z,
          rotateY: rotateYFronface,
          // @ts-ignore
          opacity,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999,
          perspective: "2000px",
        }}
      >
        <Box
          as={m.div}
          h="555px"
          borderRadius="1.3rem"
          className="holo-card"
          position="relative"
          bgImage={winner?.card?.img || "none"}
          zIndex="10"
          transition="box-shadow 0.2s ease"
          willChange="transform, filter"
          boxShadow="0 55px 35px -20px rgba(0, 0, 0, 0.5)"
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          backgroundPosition="50% 50%"
          transformOrigin="center"
          style={{
            // @ts-ignore
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
              // @ts-ignore
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
              // @ts-ignore
              animation: animationSparkle,
            }}
          />
        </Box>
      </Box>
    </m.div>
  );
};

export default HoloCard;

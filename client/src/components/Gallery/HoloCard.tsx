import React, { useRef } from "react";
import { Box } from "@chakra-ui/react";
import { m, useTransform, useViewportScroll } from "framer-motion";
import useElementSize from "~hooks/useElementSize";
import useWinner from "~hooks/useWinner";
import FrontHoloCard from "~src/components/Gallery/FrontHoloCard";
import { screenPercent } from "~utils/helper";

export const START_ROTATION = 150;
export const END_ROTATION = 170;

const HoloCard = () => {
  const { scrollY } = useViewportScroll();
  const ref = useRef();
  // const { width, parentWidth } = useElementSize(ref);
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
      // ref={ref}
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
        {winner && (
          <FrontHoloCard
            winner={winner}
            animationCard={animationCard}
            animationGradient={animationGradient}
            animationSparkle={animationSparkle}
          />
        )}
      </Box>
    </m.div>
  );
};

export default HoloCard;

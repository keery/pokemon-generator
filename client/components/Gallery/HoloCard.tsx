import React, { useRef } from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import { m, useTransform, useViewportScroll } from "framer-motion";
import useElementSize from "~hooks/useElementSize";
import useWinner from "~hooks/useWinner";

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

const HoloCard = () => {
  const { scrollY } = useViewportScroll();
  const ref = useRef();
  const { width, parentWidth } = useElementSize(ref);
  const { data: winner, isLoading } = useWinner();

  const y = useTransform(scrollY, [0, 1000], [0, 1000]);
  const x = useTransform(
    scrollY,
    [0, 400, 600],
    [0, 0, -(parentWidth / 2 - width)]
  );
  const z = useTransform(scrollY, [300, 500], [1, 1.15]);

  // Backface
  const rotateZBackface = useTransform(scrollY, [0, 400, 600], [3, 3, 0]);
  const rotateXBackface = useTransform(scrollY, [0, 400, 600], [6, 6, 0]);
  const rotateYBackface = useTransform(
    scrollY,
    [0, 400, 600, 650, 850],
    [331, 331, 360, 360, 180]
  );

  const opacity = useTransform(scrollY, [749, 750], [0, 1]);
  const rotateYFronface = useTransform(scrollY, [0, 650, 850], [180, 180, 0]);
  const animationCard = useTransform(scrollY, (value) =>
    value >= 860 ? "holoCard 12s ease 0s infinite" : ""
  );

  const animationGradient = useTransform(scrollY, (value) =>
    value >= 860 ? "holoGradient 12s ease 0s infinite" : ""
  );
  const animationSparkle = useTransform(scrollY, (value) =>
    value >= 860 ? "holoSparkle 12s ease 0s infinite" : ""
  );

  return (
    <m.div
      ref={ref}
      className="holo-card-container"
      style={{
        position: "relative",
        perspective: "2000px",
        transform: "translate3d(0.1px, 0.1px, 0.1px)",
      }}
    >
      <Box
        as={m.div}
        style={{
          touchAction: "none",
          width: "400px",
          y,
          x,
          z,
          rotateX: rotateXBackface,
          rotateZ: rotateZBackface,
          rotateY: rotateYBackface,
          backfaceVisibility: "hidden",
        }}
        h="555px"
        borderRadius="1.3rem"
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
      {winner && (
        <Box
          as={m.div}
          style={{
            touchAction: "none",
            y,
            x,
            z,
            rotateY: rotateYFronface,
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
            bgImage={winner.img}
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
          >
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
              // opacity={1}
              backgroundImage='url("https://assets.codepen.io/13471/sparkles.gif"),
              url(https://assets.codepen.io/13471/holo.png),
              linear-gradient(
                125deg,
                #ff008450 15%,
                #fca40040 30%,
                #ffff0030 40%,
                #00ff8a20 60%,
                #00cfff40 70%,
                #cc4cfa50 85%
              );'
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
        </Box>
      )}
    </m.div>
  );
};

export default HoloCard;

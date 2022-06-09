import React, { useRef, useEffect } from "react";
import { Box, AspectRatio } from "@chakra-ui/react";
import { m, useTransform, useViewportScroll } from "framer-motion";
import useElementSize from "~hooks/useElementSize";

const HoloCard = () => {
  const { scrollY } = useViewportScroll();
  const ref = useRef();
  const { width, parentWidth } = useElementSize(ref);

  const y = useTransform(scrollY, [0, 1000], [0, 1100]);
  const x = useTransform(
    scrollY,
    [0, 400, 600],
    [0, 0, -(parentWidth / 2 - width / 2)]
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

  // Frontface
  // 0%,
  // 100% {
  //   transform: rotateZ(0deg) rotateX(0deg) rotateY(0deg);
  // }
  // 5%,
  // 8% {
  //   transform: rotateZ(0deg) rotateX(6deg) rotateY(-20deg);
  // }
  // 13%,
  // 16% {
  //   transform: rotateZ(0deg) rotateX(-9deg) rotateY(32deg);
  // }
  // 35%,
  // 38% {
  //   transform: rotateZ(3deg) rotateX(12deg) rotateY(20deg);
  // }
  // 55% {
  //   transform: rotateZ(-3deg) rotateX(-12deg) rotateY(-27deg);
  // }

  const opacity = useTransform(scrollY, [0, 649, 650], [0, 0, 1]);
  const rotateYFronface = useTransform(scrollY, [0, 650, 850], [180, 180, 0]);
  // const rotateZFrontface = useTransform(
  //   scrollY,
  //   [900, 916, 935, 938, 955, 1000],
  //   [0, 0, 3, 3, -3, 0]
  // );
  // const rotateXFrontface = useTransform(
  //   scrollY,
  //   [900, 905, 908, 913, 916, 935, 938, 955, 1000],
  //   [0, 6, 6, -9, -9, 12, 12, -12, 0]
  // );

  return (
    <m.div
      ref={ref}
      className="holo-card-container"
      style={{
        position: "relative",
        perspective: "2000px",
        transform: "translate3d(0.1px, 0.1px, 0.1px)",
        // boxShadow: "0 55px 35px -20px rgba(0, 0, 0, 0.5)",
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
          // scale,
          rotateX: rotateXBackface,
          rotateZ: rotateZBackface,
          rotateY: rotateYBackface,
        }}
        h="555px"
        borderRadius="1.3rem"
        className="holo-card"
        position="relative"
        // bgImage="https://drive.google.com/uc?export=view&id=1UTb8ESvXU90DAX6n3bqExECKm5Xx0Xtd"
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
          // scale,
          // rotateX: rotateXFrontface,
          // rotateZ: rotateZFrontface,
          rotateY: rotateYFronface,
          opacity,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backfaceVisibility: "hidden",
        }}
        h="555px"
        borderRadius="1.3rem"
        className="holo-card"
        position="relative"
        bgImage="https://drive.google.com/uc?export=view&id=1UTb8ESvXU90DAX6n3bqExECKm5Xx0Xtd"
        zIndex="10"
        transition="box-shadow 0.2s ease"
        willChange="transform, filter"
        boxShadow="0 55px 35px -20px rgba(0, 0, 0, 0.5)"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        backgroundPosition="50% 50%"
        transformOrigin="center"
      />
    </m.div>
  );
};

export default HoloCard;

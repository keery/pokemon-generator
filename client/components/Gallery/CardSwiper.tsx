import React, { useRef, useState } from "react";
import useCards from "~hooks/useCards";
import { Flex, Circle, Box, Container } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Mousewheel, Navigation, Keyboard } from "swiper";
import CardThumbnail from "~components/Gallery/CardThumbnail";
import CardThumbnailSkeleton from "~components/Gallery/CardThumbnailSkeleton";
import { useBreakpointValue } from "@chakra-ui/react";
import Prev from "public/assets/img/prev.svg";
import Next from "public/assets/img/next.svg";

const Arrow = ({ onClick, direction, isDisabled }) => {
  const transform = `translateY(-50%) ${
    direction === "prev" ? "translateX(50%)" : "translateX(-50%)"
  }`;
  return (
    <Circle
      layerStyle="glass"
      onClick={onClick}
      pos="absolute"
      top="50%"
      transform={transform}
      left={direction === "prev" ? "0%" : "auto"}
      right={direction === "next" ? "0%" : "auto"}
      zIndex={100}
      fontSize="2.3rem"
      p=".8rem"
      bgColor="rgb(0 0 0 / 40%)"
      color="white"
      cursor="pointer"
      transition="opacity 200ms, background-color ease-in-out 200ms, transform ease-in-out 100ms"
      opacity={isDisabled ? 0 : 1}
      _active={{
        transform: `${transform} scale(0.9)`,
      }}
      _hover={{
        bgColor: "rgb(0 0 0 / 50%)",
      }}
    >
      {direction === "next" ? <Next /> : <Prev />}
    </Circle>
  );
};

SwiperCore.use([Mousewheel, Navigation, Keyboard]);

const CardSwiper = () => {
  const { isLoading, data } = useCards();
  const text = "TOP 10 RANKING ";
  const nbSkeleton = useBreakpointValue({ base: 6, sm: 8, md: 12, lg: 16 });
  const swiperRef = useRef(null);
  const [extremity, setExtremity] = useState<"beginning" | "end">("beginning");
  const slidesPerView = 3;

  return (
    <Flex pos="relative">
      <Container p={0} margin={0} maxW="100vw" overflow="hidden">
        <Container>
          <Flex userSelect="none" pointerEvents="none" pos="relative" ml={10}>
            <Flex
              animation="rotate 7.5s linear infinite"
              pos="relative"
              w="100px"
              h="100px"
              layerStyle="glass"
            >
              {text
                .replaceAll(" ", "-")
                .split("")
                .map((char, i) => (
                  <Box
                    key={`rotate-word-${i}`}
                    as="span"
                    textTransform="uppercase"
                    pos="absolute"
                    transformOrigin="0 50px"
                    top="0"
                    left="50%"
                    fontWeight="900"
                    transform={`rotate(${i * 24.5}deg)`}
                  >
                    {char}
                  </Box>
                ))}
            </Flex>
            {/* <Flex
          width="20px"
          h="20px"
          border="2px solid black"
          borderRadius="100%"
          pos="absolute"
          top="50%"
          left="50%"
          transform="translateX(-50%) translateY(-50%)"
          bgColor="black"
        /> */}
          </Flex>
          <Swiper
            // @ts-ignore
            ref={swiperRef}
            spaceBetween={20}
            navigation
            keyboard
            onReachBeginning={() => setExtremity("beginning")}
            onReachEnd={() => {
              if (extremity === null) setExtremity("end");
            }}
            onFromEdge={() => setExtremity(null)}
            mousewheel={{
              sensitivity: 4,
              forceToAxis: true,
            }}
            breakpoints={{
              "@0.00": {
                slidesPerView,
                spaceBetween: 10,
              },
              "@0.75": {
                slidesPerView,
                spaceBetween: 10,
              },
              "@1.00": {
                slidesPerView,
                spaceBetween: 10,
              },
              "@1.50": {
                slidesPerView,
                spaceBetween: 10,
              },
            }}
            className={`card-swiper`}
          >
            {isLoading ? (
              Array.from(Array(nbSkeleton)).map((n, i) => (
                <SwiperSlide key={`skeleton-swiper-${i}`}>
                  <CardThumbnailSkeleton />
                </SwiperSlide>
              ))
            ) : (
              <>
                {data.map((card, i) => (
                  <SwiperSlide key={card.id}>
                    <CardThumbnail card={card} layoutPrefix="swiper" />
                  </SwiperSlide>
                ))}
              </>
            )}
            <Arrow
              isDisabled={extremity === "beginning"}
              direction="prev"
              onClick={() => swiperRef.current.swiper.slidePrev()}
            />
            <Arrow
              isDisabled={extremity === "end"}
              direction="next"
              onClick={() => swiperRef.current.swiper.slideNext()}
            />
          </Swiper>
        </Container>
      </Container>
    </Flex>
  );
};

export default CardSwiper;

import React, { useRef, useCallback, useEffect } from "react";
import { Layer, Group, Stage } from "react-konva";
import { useFormContext, useWatch } from "react-hook-form";
import {
  Box,
  useOutsideClick,
  Flex,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import Name from "./Card/Name";
import Attacks from "./Card/Attacks";
import MainImage from "./Card/MainImage";
import Backface from "./Card/Backface";
import Evolution from "./Card/Evolution";
import HP from "./Card/HP";
import SubInfo from "./Card/SubInfo";
import ColorBackground from "./Card/ColorBackground";
import TypeWithAmount from "./Card/TypeWithAmount";
import Description from "./Card/Description";
import FirstEdition from "./Card/FirstEdition";
import Illustrator from "./Card/Illustrator";
import CollectionNumber from "./Card/CollectionNumber";
import TypeBackground from "./Card/TypeBackground";
import Rarity from "./Card/Rarity";
import Retreat from "./Card/Retreat";
import { cardAtom } from "~atoms/card";
import { useRecoilState } from "recoil";
import PokemonsBackground from "./PokemonsBackground";
import InteractiveLayer from "./Interactive/InteractiveLayer";
import { useRecoilValue } from "recoil";
import { areaAtom } from "~atoms/area";
import Mousetrap from "mousetrap";
import Konva from "konva";
import CacheForm from "~components/CacheForm";

Konva.hitOnDragEnabled = true;

const Card = () => {
  const { isVisible } = useRecoilValue(areaAtom);
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const imgRef = useRef(null);
  const layerRef = useRef(null);
  const { control, setValue } = useFormContext();
  const [card, setCard] = useRecoilState(cardAtom);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const stage = useWatch({ control, name: "stage" });

  const updateImgPos = useCallback((event: any): void => {
    const { attrs } = event.target;
    setValue(`${attrs.name}X`, attrs.x);
    setValue(`${attrs.name}Y`, attrs.y);
  }, []);

  const updateScale = useCallback(
    (
      name,
      scaleX: number,
      scaleY: number,
      rotation: number,
      x: number,
      y: number
    ) => {
      setValue(`${name}ScaleX`, scaleX);
      setValue(`${name}ScaleY`, scaleY);
      setValue(`${name}Rotation`, rotation);
      setValue(`${name}X`, x);
      setValue(`${name}Y`, y);
    },
    []
  );

  const updateImgSize = useCallback(
    (name: string, width: number, height: number) => {
      setValue(`${name}Width`, width);
      setValue(`${name}Height`, height);
    },
    []
  );

  const preserveRatioCanva = () => {
    if (
      typeof containerRef !== "undefined" &&
      typeof imgRef !== "undefined" &&
      containerRef.current
    ) {
      containerRef.current.style.width = `${imgRef.current.width}px`;
      containerRef.current.style.height = `${imgRef.current.height}px`;
    }
  };

  useEffect(() => {
    window.addEventListener("load", preserveRatioCanva);
    window.addEventListener("resize", preserveRatioCanva);
    new ResizeObserver(preserveRatioCanva).observe(imgRef.current);

    return () => {
      window.removeEventListener("resize", preserveRatioCanva);
      window.removeEventListener("load", preserveRatioCanva);
    };
  }, [imgRef, containerRef]);

  const resetSelected = useCallback(() => {
    if (card.selectedImg === null) return;
    setCard({ ...card, selectedImg: null });
  }, [card]);

  useEffect(() => {
    if (!Boolean(card.selectedImg)) return;
    Mousetrap.bind("backspace", () => {
      setCard({ ...card, selectedImg: null });
      setValue(card.selectedImg, null);
    });
    return () => {
      Mousetrap.unbind("return");
    };
  }, [card.selectedImg]);

  useOutsideClick({ ref: stageRef, handler: resetSelected });

  useEffect(() => {
    layerRef.current.getCanvas()._canvas.id = "card";
  }, []);

  return (
    <Flex
      pos="relative"
      className={card.isFlipped ? "flipped" : ""}
      w="100%"
      h={{ base: "100%", xl: "100%" }}
      justifyContent="center"
      alignItems="center"
    >
      <CacheForm />
      <Flex
        alignItems="center"
        h="100%"
        display="inline-flex"
        pos="relative"
        transition="padding 200ms ease-in-out"
        // Add padding to display card area label only if eyes is on, only on desktop and if no img is selected
        py={isVisible && !isMobile && card.selectedImg === null ? 14 : 0}
        px={isVisible && !isMobile && card.selectedImg === null ? 30 : 0}
      >
        <Image
          alt="Card shape"
          opacity="0"
          ref={imgRef}
          src="/assets/img/card-shape.png"
          maxW="100%"
          maxH="100%"
          m="0 auto"
          h="auto"
          w="auto"
        />
        <PokemonsBackground control={control} />
        <Box
          ref={containerRef}
          margin="0 auto"
          pos="absolute"
          left={0}
          right={0}
          top="50%"
          bottom={0}
          transform="translateY(-50%)"
          transition="box-shadow ease-in-out 10ms"
          boxShadow={
            card.isFlipped
              ? "0px 15px 15px rgb(0 0 0 / 0%)"
              : "0px 15px 15px rgb(0 0 0 / 19%)"
          }
          borderRadius="1.6rem"
        >
          <Box className="card-container" overflow="visible!important">
            <Backface />
            <Box className="card-stage" ref={stageRef}>
              <Stage
                width={500}
                height={700}
                onMouseDown={(e) => {
                  if (
                    !e.target.attrs.name ||
                    (!e.target.attrs.isSelected &&
                      !e.target.attrs.name.includes("_anchor"))
                  ) {
                    resetSelected();
                  }
                }}
              >
                <Layer ref={layerRef}>
                  <ColorBackground control={control} />
                  <TypeBackground control={control} />

                  <Name control={control} stage={stage} />
                  <HP control={control} />
                  <MainImage
                    control={control}
                    updateImgPos={updateImgPos}
                    updateScale={updateScale}
                    isSelected={card.selectedImg === "mainImage"}
                    updateImgSize={updateImgSize}
                    onSelect={() =>
                      setCard({ ...card, selectedImg: "mainImage" })
                    }
                  />
                  <Evolution
                    control={control}
                    updateImgPos={updateImgPos}
                    isSelected={card.selectedImg === "evolvePicture"}
                    updateScale={updateScale}
                    updateImgSize={updateImgSize}
                    onSelect={() =>
                      setCard({ ...card, selectedImg: "evolvePicture" })
                    }
                  />
                  <FirstEdition control={control} />
                  <SubInfo control={control} />
                  <Attacks control={control} />
                  <Group x={38} y={593} width={570}>
                    <TypeWithAmount control={control} name="weakness" />
                    <TypeWithAmount
                      control={control}
                      name="resistance"
                      x={165}
                    />
                    <Retreat control={control} />
                  </Group>
                  <Description control={control} />
                  <Illustrator control={control} />
                  <CollectionNumber control={control} />
                  <Rarity control={control} />
                </Layer>
              </Stage>
            </Box>
            <InteractiveLayer />
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Card;

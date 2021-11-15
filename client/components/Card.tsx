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
import { useTranslation } from "next-i18next";

const Card = () => {
  const { isVisible } = useRecoilValue(areaAtom);
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const imgRef = useRef(null);
  const { control, setValue } = useFormContext();
  const [card, setCard] = useRecoilState(cardAtom);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { t } = useTranslation("generator");

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

  const preserveRatioCanva = () => {
    if (typeof containerRef !== "undefined" && typeof imgRef !== "undefined") {
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

  const deleteFile = (name) => {
    setValue(name, null);
    setCard({ ...card, selectedImg: null });
  };

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

  const stage = useWatch({ control, name: "stage" });

  return (
    <Flex
      pos="relative"
      className={card.isFlipped ? "flipped" : ""}
      w="100%"
      h={{ base: "100%", xl: "100%" }}
      py={isVisible && !isMobile ? 14 : 0}
      px={isVisible && !isMobile ? 30 : 0}
      justifyContent="center"
      alignItems="center"
    >
      <Flex alignItems="center" h="100%" display="inline-flex" pos="relative">
        <Image
          alt="Card shape"
          opacity="0"
          ref={imgRef}
          src="/assets/img/card-shape.png"
          maxW="100%"
          maxH="100%"
          m="0 auto"
          w="100%"
        />
        <Box
          ref={containerRef}
          margin="0 auto"
          pos="absolute"
          left={0}
          right={0}
          top="50%"
          bottom={0}
          transform="translateY(-50%)"
        >
          <Box className="card-container" overflow="visible!important">
            <PokemonsBackground control={control} />
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
                <Layer>
                  <ColorBackground control={control} />
                  <TypeBackground control={control} />
                  <HP control={control} />
                  <SubInfo control={control} />
                  <MainImage
                    control={control}
                    updateImgPos={updateImgPos}
                    updateScale={updateScale}
                    isSelected={card.selectedImg === "mainImage"}
                    onSelect={() =>
                      setCard({ ...card, selectedImg: "mainImage" })
                    }
                    onDelete={() => deleteFile("mainImage")}
                    t={t}
                  />
                  <Name control={control} stage={stage} />
                  <Attacks control={control} />
                  <Evolution
                    control={control}
                    updateImgPos={updateImgPos}
                    isSelected={card.selectedImg === "evolvePicture"}
                    updateScale={updateScale}
                    onSelect={() =>
                      setCard({ ...card, selectedImg: "evolvePicture" })
                    }
                    onDelete={() => deleteFile("evolvePicture")}
                    t={t}
                  />
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

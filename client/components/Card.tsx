import React, { useRef, useCallback } from "react";
import { Layer, Group, Stage } from "react-konva";
import { useFormContext } from "react-hook-form";
import { Box, Image } from "@chakra-ui/react";
import Name from "./Card/Name";
import Attacks from "./Card/Attacks";
import MainImage from "./Card/MainImage";
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
import { DragEndEvent } from "leaflet";
import useClickOutside from "~hooks/useClickOutside";
import { cardState } from "~atoms/cardState";
import { useRecoilState } from "recoil";

const Card = () => {
  const stageRef = useRef();
  const { control, setValue } = useFormContext();
  const [card, setCard] = useRecoilState(cardState);

  const updateImgPos = (event: DragEndEvent): void => {
    const { attrs } = event.target;
    setValue(`${attrs.name}X`, attrs.x);
    setValue(`${attrs.name}Y`, attrs.y);
  };

  const updateScale = (name, scaleX: number, scaleY: number) => {
    setValue(`${name}ScaleX`, scaleX);
    setValue(`${name}ScaleY`, scaleY);
  };

  const resetSelected = useCallback(() => {
    setCard({ ...card, selectedImg: null });
  }, [card]);

  useClickOutside(stageRef, resetSelected);

  return (
    <Box border="none" pos="relative" ref={stageRef}>
      <Image
        src="assets/img/pokemon-water-3.png"
        pos="absolute"
        left="105%"
        right="0%"
        w="210px"
        transform="rotateY(180deg)"
      />
      <Image
        src="assets/img/kaiminus.png"
        pos="absolute"
        bottom="-10%"
        left="102%"
        w="300px"
      />
      <Image
        src="assets/img/carapuce.png"
        pos="absolute"
        right="100%"
        top="20%"
        width="270px"
        transform="rotate(20deg)"
      />
      <ColorBackground control={control} />
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
          <TypeBackground control={control} />
          <MainImage
            control={control}
            updateImgPos={updateImgPos}
            updateScale={updateScale}
            isSelected={card.selectedImg === "mainImage"}
            onSelect={() => setCard({ ...card, selectedImg: "mainImage" })}
          />
          <Name control={control} />
          <HP control={control} />
          <SubInfo control={control} />
          <Attacks control={control} />
          <Evolution control={control} />
          <Group x={38} y={593} width={570}>
            <TypeWithAmount control={control} name="weakness" />
            <TypeWithAmount control={control} name="resistance" x={165} />
            <Retreat control={control} />
          </Group>
          <Description control={control} />
          <Illustrator control={control} />
          <CollectionNumber control={control} />
          <Rarity control={control} />
        </Layer>
      </Stage>
    </Box>
  );
};

export default Card;

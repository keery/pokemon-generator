import React from "react";
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

const Card = () => {
  const stageRef = React.createRef();
  const { control, setValue } = useFormContext();

  const updateImgPos = (event: DragEndEvent): void => {
    const { attrs } = event.target;
    setValue(`${attrs.name}X`, attrs.x);
    setValue(`${attrs.name}Y`, attrs.y);
  };

  return (
    <Box border="none" pos="relative">
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
      <Stage width={500} height={700}>
        <Layer>
          <TypeBackground control={control} />
          <Name control={control} />
          <HP control={control} />
          <SubInfo control={control} />
          <Attacks control={control} />
          <MainImage control={control} updateImgPos={updateImgPos} />
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

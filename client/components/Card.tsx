import React, { useRef, useCallback } from "react";
import { Layer, Group, Stage } from "react-konva";
import { useFormContext } from "react-hook-form";
import { Box, useOutsideClick } from "@chakra-ui/react";
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

const Card = () => {
  const stageRef = useRef();
  const { control, setValue } = useFormContext();
  const [card, setCard] = useRecoilState(cardAtom);

  const updateImgPos = useCallback((event: any): void => {
    const { attrs } = event.target;
    setValue(`${attrs.name}X`, attrs.x);
    setValue(`${attrs.name}Y`, attrs.y);
  }, []);

  const updateScale = useCallback((name, scaleX: number, scaleY: number) => {
    setValue(`${name}ScaleX`, scaleX);
    setValue(`${name}ScaleY`, scaleY);
  }, []);

  const resetSelected = useCallback(() => {
    setCard({ ...card, selectedImg: null });
  }, [card]);

  useOutsideClick({ ref: stageRef, handler: resetSelected });

  return (
    <Box pos="relative" className={card.isFlipped ? "flipped" : ""}>
      <PokemonsBackground control={control} />
      <Box ref={stageRef}>
        <Backface />
        <Stage
          id="card"
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
              onSelect={() => setCard({ ...card, selectedImg: "mainImage" })}
            />
            <Name control={control} />
            <Attacks control={control} />
            <Evolution
              control={control}
              updateImgPos={updateImgPos}
              isSelected={card.selectedImg === "evolvePicture"}
              updateScale={updateScale}
              onSelect={() =>
                setCard({ ...card, selectedImg: "evolvePicture" })
              }
            />
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
    </Box>
  );
};

export default Card;

import React from "react";
import { Text, Group } from "react-konva";
import { Select } from "~@types/CardGenerator";
import ImageCanvas from "./ImageCanvas";

const global = {
  img: null,
  height: 98,
  width: 428,
  textWidth: 0,
  textHeight: 0,
  textAttackX: 0,
};

interface Props {
  name: string;
  damage: Select<string>;
  description: string;
  type: Select<Element>;
  amount: Select<number>;
  x: number;
  y: number;
  isTiny: boolean;
}

const Attack = ({
  x,
  y,
  isTiny = false,
  name,
  damage,
  description,
  type,
  amount,
}: Props) => {
  let imgTypeAmountY = 25;
  let damageY = 40;

  let attackNameData: any = {
    fontSize: 24,
    y: 20,
    x: 0,
    align: "center",
    verticalAlign: "middle",
    width: 423,
  };

  if (isTiny) {
    attackNameData.y = 14;
    global.height = 80;
    imgTypeAmountY = 14;
    damageY = 28;
  }

  if (Boolean(description)) {
    attackNameData = {
      fontSize: 20,
      y: 2,
      align: "left",
      verticalAlign: "top",
    };
  }

  if (Boolean(amount) && Boolean(type)) {
    global.img = (
      <ImageCanvas
        src={`1-gen/${amount.value}-${type.value}.png`}
        x={0}
        width={50}
        height={50}
        y={imgTypeAmountY}
      />
    );
  } else {
    global.img = null;
  }

  if (Boolean(damage?.value) || global.img) {
    global.textAttackX = 60;
    global.textWidth = 306;
    global.textHeight = 100;
  } else {
    global.textAttackX = 12;
    global.textWidth = 405;
    global.textHeight = 100;
  }

  const attackDescData = {
    fontSize: 17,
    y: name !== "" ? 23 : 2,
    align: "left",
  };

  return (
    <>
      <Group
        width={global.width}
        height={global.height}
        x={x}
        y={y}
        clipHeight={global.height}
        clipY={0}
        clipX={0}
      >
        {global.img}
        <Group
          y={attackNameData.y}
          x={global.textAttackX}
          width={global.textWidth}
          height={40}
        >
          <Text
            text={name}
            fontFamily="pokename"
            fontSize={attackNameData.fontSize}
            y={attackNameData.y}
            x={0}
            width={global.textWidth}
            height={28}
            align={attackNameData.align}
            verticalAlign={attackNameData.verticalAlign}
          />
          <Text
            text={description}
            fontFamily="gstd"
            fontSize={attackDescData.fontSize}
            y={attackDescData.y}
            x={0}
            width={global.textWidth}
            height={isTiny ? 60 : 90}
            wrap="word"
            lineHeight={1.1}
          />
        </Group>
        <Text
          text={damage?.value}
          fontFamily="gstd"
          fontSize={32}
          y={damageY}
          x={0}
          width={423}
          align="right"
        />
      </Group>
    </>
  );
};

export default Attack;

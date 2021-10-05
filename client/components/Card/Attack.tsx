import React from "react";
import { Text, Group } from "react-konva";
import { useWatch } from "react-hook-form";
import { IAttack } from "~@types/Card";
import ImageCanvas from "./ImageCanvas";

const global = {
  img: null,
  height: 98,
  width: 428,
  textWidth: 0,
  textHeight: 0,
  textAttackX: 0,
};

const Attack = ({ name, x, y, isTiny = false, control }) => {
  const attack: IAttack = useWatch({
    control,
    name,
  });
  let imgTypeAmountY = 25;
  let damageY = 40;

  if (isTiny) {
    global.height = 80;
    imgTypeAmountY = 14;
    damageY = 28;
  }

  let attackNameData: any = {
    fontSize: 24,
    y: 15,
    x: 0,
    align: "center",
    verticalAlign: "middle",
    width: 423,
  };

  if (Boolean(attack.info)) {
    attackNameData = {
      fontSize: 20,
      y: 2,
      align: "left",
      verticalAlign: "top",
    };
  }

  if (Boolean(attack.amount) && Boolean(attack.type)) {
    global.img = (
      <ImageCanvas
        src={`1-gen/${attack.amount}-${attack.type}.png`}
        x={0}
        width={50}
        height={50}
        y={imgTypeAmountY}
      />
    );
  } else {
    global.img = null;
  }

  if (Boolean(attack.damage) || global.img) {
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
            text={attack.name}
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
            text={attack.info}
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
          text={attack.damage}
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

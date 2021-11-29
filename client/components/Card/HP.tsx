import React from "react";
import { useWatch } from "react-hook-form";
import { Text } from "react-konva";
import { Select } from "~@types/CardGenerator";

const HP = ({ control }) => {
  const hp: Select<string> = useWatch({
    control,
    name: "hp",
  });
  if (!Boolean(hp)) return null;

  return (
    <Text
      text={`${hp.value} HP`}
      fontFamily="pokehp"
      width={150}
      height={150}
      fontSize={28}
      y={50}
      x={261}
      align="right"
      fill="#ff1f00"
    />
  );
};

export default HP;

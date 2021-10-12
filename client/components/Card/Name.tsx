import React from "react";
import { useWatch } from "react-hook-form";
import { Text } from "react-konva";
import { BASIC } from "~constants";
import { Select, Stage } from "~@types/Card";

const Name = ({ control }) => {
  const {
    name,
    stage,
  }: {
    name?: string;
    stage?: Select<Stage>;
  } = useWatch({
    control,
    name: ["name", "stage"],
  });

  return (
    <Text
      text={name}
      fontFamily="pokename"
      fontSize={31}
      y={52}
      x={stage.value === BASIC ? 50 : 135}
    />
  );
};

export default Name;

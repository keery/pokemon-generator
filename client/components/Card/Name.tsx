import React from "react";
import { useWatch } from "react-hook-form";
import { Text } from "react-konva";
import { BASIC } from "~constants";

const Name = ({ control }) => {
  const { name, stage } = useWatch({
    control,
    name: ["name", "stage"],
  });

  return (
    <Text
      text={name}
      fontFamily="pokename"
      fontSize={31}
      y={52}
      x={stage === BASIC ? 50 : 135}
    />
  );
};

export default Name;

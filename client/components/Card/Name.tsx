import React from "react";
import { useWatch, Control } from "react-hook-form";
import { Text } from "react-konva";
import { BASIC } from "~constants";
import { Stage } from "~@types/CardGenerator";
import { Select } from "~constants";

interface Props {
  control: Control;
  stage: Select<Stage>;
}

const Name = ({ control, stage }: Props) => {
  const name: string = useWatch({
    control,
    name: "name",
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

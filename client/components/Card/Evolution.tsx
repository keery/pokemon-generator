import React from "react";
import { useWatch } from "react-hook-form";
import { Group } from "react-konva";
import EvolutionImage from "./EvolutionImage";
import EvolutionName from "./EvolutionName";
import ImageCanvas from "./ImageCanvas";

const Evolution = ({ control }) => {
  const stage = useWatch({
    control,
    name: "stage",
  });
  if (stage === "basic") return null;

  return (
    <Group>
      <ImageCanvas
        src="1-gen/slice-stage.png"
        x={49}
        y={79}
        width={79}
        height={50}
      />
      <EvolutionImage control={control} />
      <EvolutionName control={control} />
    </Group>
  );
};

export default Evolution;

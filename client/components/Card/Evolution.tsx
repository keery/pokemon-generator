import React from "react";
import { useWatch } from "react-hook-form";
import EvolutionImage from "./EvolutionImage";
import EvolutionName from "./EvolutionName";
import ImageCanvas from "./ImageCanvas";
import { BASIC } from "~constants";
import { Select, Stage } from "~@types/Card";

const Evolution = ({
  control,
  updateImgPos,
  isSelected,
  onSelect,
  updateScale,
}) => {
  const stage: Select<Stage> = useWatch({
    control,
    name: "stage",
  });

  if (stage.value === BASIC) return null;

  return (
    <>
      <ImageCanvas
        src="1-gen/slice-stage.png"
        x={49}
        y={79}
        width={79}
        height={50}
      />
      <EvolutionImage
        control={control}
        updateImgPos={updateImgPos}
        isSelected={isSelected}
        onSelect={onSelect}
        updateScale={updateScale}
      />
      <EvolutionName control={control} />
    </>
  );
};

export default Evolution;

import React from "react";
import { useWatch } from "react-hook-form";
import ImageCanvas from "~src/components/Card/ImageCanvas";
import { Element, Stage } from "~@types/CardGenerator";
import { Select } from "~constants";

const TypeBackground = ({ control }) => {
  const [type, stage]: [Select<Element>, Select<Stage>] = useWatch({
    control,
    name: ["type", "stage"],
  });

  return (
    <ImageCanvas
      src={`1-gen/${type.value}-${stage.value}.webp`}
      width={500}
      height={700}
    />
  );
};

export default TypeBackground;

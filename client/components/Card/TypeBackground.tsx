import React from "react";
import { useWatch } from "react-hook-form";
import ImageCanvas from "~components/Card/ImageCanvas";
import { Select, Element, Stage } from "~@types/Card";

const TypeBackground = ({ control }) => {
  const {
    type,
    stage,
  }: {
    type?: Select<Element>;
    stage?: Select<Stage>;
  } = useWatch({
    control,
    name: ["type", "stage"],
  });

  return (
    <ImageCanvas
      src={`1-gen/${type.value}-${stage.value}.png`}
      width={500}
      height={700}
    />
  );
};

export default TypeBackground;

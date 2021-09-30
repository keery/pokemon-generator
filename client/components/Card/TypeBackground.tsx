import React from "react";
import { useWatch } from "react-hook-form";
import ImageCanvas from "./ImageCanvas";

const TypeBackground = ({ control }) => {
  const { type, stage } = useWatch({
    control,
    name: ["type", "stage"],
  });

  return (
    <ImageCanvas src={`1-gen/${type}-${stage}.png`} width={500} height={700} />
  );
};

export default TypeBackground;

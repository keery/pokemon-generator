import React from "react";
import { useWatch } from "react-hook-form";
import ImageCanvas from "./ImageCanvas";
import { Rarity as RarityType } from "~@types/CardGenerator";
import { Select } from "~constants";

const Rarity = ({ control }) => {
  const rarity: Select<RarityType> = useWatch({
    control,
    name: "rarity",
  });

  if (!Boolean(rarity)) return null;

  return (
    <ImageCanvas
      src={`1-gen/rarity-${rarity.value}.png`}
      y={662}
      x={460}
      width={10.5}
      height={10.5}
    />
  );
};

export default Rarity;

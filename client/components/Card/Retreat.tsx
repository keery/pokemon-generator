import React from "react";
import { useWatch } from "react-hook-form";
import ImageCanvas from "~components/Card/ImageCanvas";
import { Select } from "~constants";

const Retreat = ({ control }) => {
  const retreat: Select<number> = useWatch({
    control,
    name: "retreat",
  });

  if (!Boolean(retreat) || +retreat.value === 0) return null;

  return (
    <ImageCanvas
      src={`1-gen/retreat-${retreat.value}.png`}
      x={312}
      width={115}
      height={26}
    />
  );
};

export default Retreat;

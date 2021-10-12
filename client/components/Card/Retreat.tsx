import React from "react";
import { useWatch } from "react-hook-form";
import ImageCanvas from "~components/Card/ImageCanvas";
import { Select } from "~@types/Card";

const Retreat = ({ control }) => {
  const retreat: Select<string> = useWatch({
    control,
    name: "retreat",
  });

  if (!Boolean(retreat)) return null;

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

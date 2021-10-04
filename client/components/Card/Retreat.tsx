import React from "react";
import { useWatch } from "react-hook-form";
import ImageCanvas from "~components/Card/ImageCanvas";

const Retreat = ({ control }) => {
  const retreat = useWatch({
    control,
    name: "retreat",
  });

  if (!Boolean(retreat)) return null;

  return (
    <ImageCanvas
      src={`1-gen/retreat-${retreat}.png`}
      x={312}
      width={115}
      height={26}
    />
  );
};

export default Retreat;

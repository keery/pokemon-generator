import React from "react";
import { useWatch, Control } from "react-hook-form";
import ImageCanvas from "~src/components/Card/ImageCanvas";

interface Props {
  control: Control;
}

const FirstEdition = ({ control }: Props) => {
  const hasFirstEdition = useWatch({
    control,
    name: "firstEdition",
  });

  if (!hasFirstEdition) return null;

  return (
    <ImageCanvas
      src={"1-gen/first-edition.png"}
      y={375}
      x={33}
      name="firstEdition"
    />
  );
};

export default FirstEdition;

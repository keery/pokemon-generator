import React from "react";
import { useWatch } from "react-hook-form";
import { Text } from "react-konva";

const Illustrator = ({ control }) => {
  const illustrator: string = useWatch({
    control,
    name: "illustrator",
  });

  if (!Boolean(illustrator)) return null;

  return (
    <Text
      text={`Illus. ${illustrator}`}
      fontFamily="pokename"
      width={105}
      height={12}
      wrap="none"
      fontSize={10.5}
      y={664}
      x={30}
    />
  );
};

export default Illustrator;

import React from "react";
import { useWatch } from "react-hook-form";
import { Text } from "react-konva";

const EvolutionName = ({ control }) => {
  const name = useWatch({
    control,
    name: "nameEvolution",
  });
  if (!Boolean(name)) return null;

  return (
    <Text
      text={`Evolves from ${name}`}
      fontFamily="pokevolution"
      fontSize={13}
      y={34}
      x={105}
    />
  );
};

export default EvolutionName;

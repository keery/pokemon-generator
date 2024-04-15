import React from "react";
import { useWatch } from "react-hook-form";
import { Text, Group } from "react-konva";

const Description = ({ control }) => {
  const description: string = useWatch({
    control,
    name: "description",
  });
  if (!Boolean(description)) return null;

  return (
    <Group height={32} x={50} y={626} width={394}>
      <Text
        text={description}
        fontFamily="pokevolution"
        width={375}
        height={35}
        fontSize={15}
        lineHeight={1.1}
      />
    </Group>
  );
};

export default Description;

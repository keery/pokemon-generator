import React from "react";
import { useWatch } from "react-hook-form";
import { Text } from "react-konva";

const Name = ({ control }) => {
  const name: string = useWatch({
    control,
    name: "name",
  });

  return <Text text={name} fontFamily="pokename" fontSize={31} y={52} x={50} />;
};

export default Name;

import React from "react";
import { useWatch } from "react-hook-form";
import { Text, Group } from "react-konva";
import ImageCanvas from "~components/Card/ImageCanvas";

const TypeWithAmount = ({ control, name, x = 0, y = 0 }) => {
  const values = useWatch({
    control,
    name: [`${name}Amount`, `${name}Type`],
  });

  const type = values[`${name}Type`];
  const amount = values[`${name}Amount`];

  return (
    <Group x={x} y={y}>
      {type !== "" && (
        <ImageCanvas
          src={`1-gen/${type}.png`}
          x={27}
          y={0}
          width={26}
          height={26}
        />
      )}
      {Boolean(amount) && amount !== "" && (
        <Text text={amount} fontFamily="pokename" fontSize={15} y={8} x={57} />
      )}
    </Group>
  );
};

export default TypeWithAmount;

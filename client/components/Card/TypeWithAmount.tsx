import React from "react";
import { useWatch } from "react-hook-form";
import { Text, Group } from "react-konva";
import ImageCanvas from "~components/Card/ImageCanvas";

const TypeWithAmount = ({ control, name, x = 0, y = 0 }) => {
  const [amount, type] = useWatch({
    control,
    name: [`${name}Amount`, `${name}Type`],
  });

  return (
    <Group x={x} y={y}>
      {Boolean(type?.value) && type?.value !== "" && (
        <ImageCanvas
          src={`1-gen/${type?.value}.png`}
          x={27}
          y={0}
          width={26}
          height={26}
        />
      )}
      {Boolean(amount) && amount.value !== "" && amount.value !== "0" && (
        <Text
          text={amount.value}
          fontFamily="pokename"
          fontSize={15}
          y={8}
          x={57}
        />
      )}
    </Group>
  );
};

export default TypeWithAmount;

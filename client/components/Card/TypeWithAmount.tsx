import React from "react";
import { useWatch } from "react-hook-form";
import { Text, Group, Image as ImageCanvas } from "react-konva";

const TypeWithAmount = ({ control, name, x = 0, y = 0 }) => {
  const values = useWatch({
    control,
    name: [`${name}Amount`, `${name}Type`],
  });

  const type = values[`${name}Type`];
  const amount = values[`${name}Amount`];
  console.log("dsfsd", type);

  return (
    <Group x={x} y={y}>
      {type && <ImageCanvas image={type} x={27} y={0} width={58} height={58} />}
      {Boolean(amount) && (
        <Text text={amount} fontFamily="pokename" fontSize={15} y={25} x={73} />
      )}
    </Group>
  );
};

export default TypeWithAmount;

import React, { useMemo } from "react";
import { useWatch } from "react-hook-form";
import { Rect } from "react-konva";
import Attack from "./Attack";

const Description = ({ control }) => {
  const {
    attack1: { type: attack1Type, amount: attack1Amount, ...attack1 },
    attack2: { type: attack2Type, amount: attack2Amount, ...attack2 },
  } = useWatch({
    control,
    name: ["attack1", "attack2"],
  });

  const isTiny = useMemo(() => {
    const attack1isFill =
      Object.values(attack1).some((value) => Boolean(value)) ||
      (Boolean(attack1Type) && Boolean(attack1Amount));

    const attack2isFill =
      Object.values(attack2).some((value) => Boolean(value)) ||
      (Boolean(attack2Type) && Boolean(attack2Amount));

    return attack1isFill && attack2isFill;
  }, [attack1, attack2]);

  return (
    <>
      <Attack
        control={control}
        x={35}
        y={isTiny ? 400 : 432}
        name="attack1"
        isTiny={isTiny}
      />
      <Rect
        visible={isTiny}
        x={34}
        y={485}
        width={429}
        height={2.25}
        fill="#000000"
      />
      <Attack
        control={control}
        x={35}
        y={isTiny ? 491 : 442}
        isTiny={isTiny}
        name="attack2"
      />
    </>
  );
};

export default Description;

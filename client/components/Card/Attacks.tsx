import React, { useMemo } from "react";
import { useWatch } from "react-hook-form";
import { Rect } from "react-konva";
import Attack from "./Attack";

const Description = ({ control }) => {
  const attack1 = useWatch({
    control,
    name: [
      "attack1Amount",
      "attack1Type",
      "attack1Name",
      "attack1Damage",
      "attack1Info",
    ],
  });

  const attack2 = useWatch({
    control,
    name: [
      "attack2Amount",
      "attack2Type",
      "attack2Name",
      "attack2Damage",
      "attack2Info",
    ],
  });

  const isTiny = useMemo(() => {
    const attack1isFill =
      attack1.slice(2).some((value) => Boolean(value)) ||
      (Boolean(attack1[0]) && Boolean(attack1[1]));

    const attack2isFill =
      attack2.slice(2).some((value) => Boolean(value)) ||
      (Boolean(attack2[0]) && Boolean(attack2[1]));

    return attack1isFill && attack2isFill;
  }, [attack1, attack2]);

  return (
    <>
      <Attack
        amount={attack1[0]}
        type={attack1[1]}
        name={attack1[2]}
        damage={attack1[3]}
        info={attack1[4]}
        x={35}
        y={isTiny ? 400 : 432}
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
        amount={attack2[0]}
        type={attack2[1]}
        name={attack2[2]}
        damage={attack2[3]}
        info={attack2[4]}
        x={35}
        y={isTiny ? 491 : 442}
        isTiny={isTiny}
      />
    </>
  );
};

export default Description;

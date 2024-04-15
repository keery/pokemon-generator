import React from "react";
import { Rect } from "react-konva";
import Attack from "./Attack";
import useAttacks from "~hooks/useAttacks";

const Description = ({ control }) => {
  const { isTiny, attack1, attack2 } = useAttacks(control);

  return (
    <>
      <Attack
        amount={attack1[0]}
        type={attack1[1]}
        name={attack1[2]}
        damage={attack1[3]}
        description={attack1[4]}
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
        description={attack2[4]}
        x={35}
        y={isTiny ? 491 : 442}
        isTiny={isTiny}
      />
    </>
  );
};

export default Description;

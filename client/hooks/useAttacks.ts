import { useMemo } from "react";
import { useWatch, Control } from "react-hook-form";

const useAttacks = (control: Control) => {
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

  return {
    isTiny,
    attack1,
    attack2,
  };
};

export default useAttacks;

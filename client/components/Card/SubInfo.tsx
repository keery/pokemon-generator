import React, { useMemo } from "react";
import { useWatch } from "react-hook-form";
import { Text } from "react-konva";

const HP = ({ control }) => {
  const [species, length, weight]: string[] = useWatch({
    control,
    name: ["species", "length", "weight"],
  });

  const pokemonInfo = useMemo(() => {
    let info = "";
    if (species !== "") info += `${species} Pokemon`;
    if (species !== "" && (length !== "" || weight !== "")) info += ". ";
    if (length !== "") info += `Length: ${length}`;
    if (length !== "" && weight !== "") info += ", ";
    if (weight !== "") info += `Weight: ${weight} lbs`;
    return info;
  }, [species, length, weight]);

  if (!Boolean(pokemonInfo)) return null;

  return (
    <Text
      text={`${pokemonInfo}.`}
      fontFamily="pokevolution"
      width={358}
      fontSize={16}
      y={380}
      x={72}
      wrap="none"
      align="center"
    />
  );
};

export default HP;

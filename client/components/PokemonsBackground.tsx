import React, { useState, useEffect } from "react";
import { Image, Box, ResponsiveValue } from "@chakra-ui/react";
import { useWatch, Control } from "react-hook-form";
import { Element, Select } from "~@types/Card";

interface Props {
  control: Control;
}

interface BgPokemon {
  src: string | ResponsiveValue<string>;
  transform?: string | ResponsiveValue<string>;
  width?: string | ResponsiveValue<string>;
  left?: string | ResponsiveValue<string>;
  maxWidth?: string | ResponsiveValue<string>;
}

const pokemons: Record<Element, BgPokemon[]> = {
  water: [
    { src: "assets/img/bg/pokemon-water-1.png", transform: "rotate(20deg)" },
    { src: "assets/img/bg/pokemon-water-2.png" },
    { src: "assets/img/bg/pokemon-water-3.png", transform: "rotateY(180deg)" },
  ],
  psychic: [
    { src: "assets/img/bg/pokemon-psychic-1.png", transform: "rotate(20deg)" },
    {
      src: "assets/img/bg/pokemon-psychic-2.png",
      transform: "rotateY(180deg)",
    },
    { src: "assets/img/bg/pokemon-psychic-3.png" },
  ],
  normal: [
    { src: "assets/img/bg/pokemon-normal-1.png", transform: "rotate(20deg)" },
    { src: "assets/img/bg/pokemon-normal-4.png", width: "350px" },
    { src: "assets/img/bg/pokemon-normal-3.png", width: "190px", left: "110%" },
  ],
  fire: [
    {
      src: "assets/img/bg/pokemon-fire-1.png",
      transform: "rotateY(180deg) translateX(28px)",
    },
    { src: "assets/img/bg/pokemon-fire-2.png" },
    { src: "assets/img/bg/pokemon-fire-3.png", transform: "rotateY(180deg)" },
  ],
  fighting: [
    {
      src: "assets/img/bg/pokemon-fighting-1.png",
    },
    {
      src: "assets/img/bg/pokemon-fighting-3.png",
      left: { base: "80%", xl: "90%" },
      width: "380px",
    },
    {
      src: "assets/img/bg/pokemon-fighting-4.png",
      width: "210px",
    },
  ],
  electric: [
    {
      src: "assets/img/bg/pokemon-electric-1.png",
      transform:
        "rotateY(180deg) translateX(20px) translateY(-90px) rotateZ(-55deg)",
    },
    {
      src: "assets/img/bg/pokemon-electric-3.png",
      transform: "rotateY(180deg)",
      width: "410px",
    },
    {
      src: "assets/img/bg/pokemon-electric-2.png",
    },
  ],
  grass: [
    {
      src: "assets/img/bg/pokemon-grass-2.png",
      transform: "rotateY(180deg) translateX(-9px) translateY(-90px)",
      width: "370px",
    },
    {
      src: "assets/img/bg/pokemon-grass-1.png",
      width: "18vw",
    },
    {
      src: "assets/img/bg/pokemon-grass-3.png",
      transform: "rotateY(180deg)",
      width: "18vw",
    },
  ],
};

const PokemonsBackground = ({ control }: Props) => {
  const selectedType: Select<Element> = useWatch({
    control,
    name: "type",
  });

  const [isVariant, setVariant] = useState(true);

  useEffect(() => {
    setVariant(!isVariant);
  }, [selectedType?.value]);

  return (
    <>
      {Object.keys(pokemons).map((element) => (
        <Box
          key={element}
          className={`bg-pokemon
          ${isVariant ? "even" : "odd"}
           ${selectedType.value === element ? "active" : "inactive"}`}
          userSelect="none"
          display={{
            base: "none",
            lg: "block",
          }}
        >
          <Box
            pos="absolute"
            right="100%"
            top="20%"
            width={pokemons[element][0].width || "270px"}
            maxWidth={pokemons[element][0].maxWidth || "none"}
          >
            <Image
              src={pokemons[element][0].src}
              transform={pokemons[element][0].transform}
            />
          </Box>
          <Box
            pos="absolute"
            bottom="-10%"
            left={pokemons[element][1].left || "102%"}
            width={pokemons[element][1].width || "300px"}
            maxWidth={pokemons[element][1].maxWidth || "none"}
          >
            <Image
              src={pokemons[element][1].src}
              transform={pokemons[element][1].transform}
            />
          </Box>
          <Box
            pos="absolute"
            right="0%"
            top="0%"
            left={pokemons[element][2].left || "105%"}
            width={pokemons[element][2].width || "250px"}
            maxWidth={pokemons[element][2].maxWidth || "none"}
          >
            <Image
              src={pokemons[element][2].src}
              transform={pokemons[element][2].transform}
            />
          </Box>
        </Box>
      ))}
    </>
  );
};

export default PokemonsBackground;

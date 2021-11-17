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
  height?: string | ResponsiveValue<string>;
  right?: string | ResponsiveValue<string>;
  top?: string | ResponsiveValue<string>;
  left?: string | ResponsiveValue<string>;
  maxHeight?: string | ResponsiveValue<string>;
}

const pokemons: Record<Element, BgPokemon[]> = {
  water: [
    {
      src: "/assets/img/bg/pokemon-water-1.png",
      transform: "rotate(20deg)",
      height: "35vh",
      maxHeight: "240px",
    },
    {
      src: "/assets/img/bg/pokemon-water-2.png",
      height: "60vh",
      maxHeight: "475px",
    },
    {
      src: "/assets/img/bg/pokemon-water-3.png",
      transform: "rotateY(180deg)",
      height: "25vh",
      maxHeight: "200px",
    },
  ],
  psychic: [
    {
      src: "/assets/img/bg/pokemon-psychic-1.png",
      transform: "rotate(20deg)",
      height: "30vh",
      maxHeight: "240px",
    },
    {
      src: "/assets/img/bg/pokemon-psychic-2.png",
      transform: "rotateY(180deg)",
      height: "40vh",
      maxHeight: "305px",
    },
    {
      src: "/assets/img/bg/pokemon-psychic-3.png",
      height: "30vh",
      maxHeight: "255px",
    },
  ],
  normal: [
    {
      src: "/assets/img/bg/pokemon-normal-1.png",
      transform: "rotate(20deg)",
      height: "34vh",
      maxHeight: "270px",
    },
    {
      src: "/assets/img/bg/pokemon-normal-4.png",
      height: "55vh",
      maxHeight: "440px",
    },
    {
      src: "/assets/img/bg/pokemon-normal-3.png",
      height: "25vh",
      maxHeight: "190px",
      left: "110%",
    },
  ],
  fire: [
    {
      src: "/assets/img/bg/pokemon-fire-1.png",
      transform: "rotateY(180deg) translateX(28px)",
      height: "35vh",
      maxHeight: "260px",
    },
    {
      src: "/assets/img/bg/pokemon-fire-2.png",
      height: "45vh",
      maxHeight: "340px",
    },
    {
      src: "/assets/img/bg/pokemon-fire-3.png",
      transform: "rotateY(180deg)",
      height: "35vh",
      maxHeight: "250px",
    },
  ],
  fighting: [
    {
      src: "/assets/img/bg/pokemon-fighting-1.png",
      height: "35vh",
      maxHeight: "260px",
      right: "103%",
    },
    {
      src: "/assets/img/bg/pokemon-fighting-3.png",
      left: { base: "80%", xl: "93%" },
      height: "50vh",
      maxHeight: "380px",
    },
    {
      src: "/assets/img/bg/pokemon-fighting-4.png",
      height: "25vh",
      maxHeight: "180px",
    },
  ],
  electric: [
    {
      src: "/assets/img/bg/pokemon-electric-1.png",
      transform: "rotateY(180deg) rotateZ(-55deg)",
      height: "45vh",
      maxHeight: "270px",
    },
    {
      src: "/assets/img/bg/pokemon-electric-3.png",
      transform: "rotateY(180deg)",
      height: "50vh",
      maxHeight: "380px",
    },
    {
      src: "/assets/img/bg/pokemon-electric-2.png",
      height: "30vh",
      maxHeight: "180px",
    },
  ],
  grass: [
    {
      src: "/assets/img/bg/pokemon-grass-2.png",
      transform: "rotateY(180deg) ",
      height: "50vh",
      maxHeight: "370px",
      right: "103%",
      top: "10%",
    },
    {
      src: "/assets/img/bg/pokemon-grass-1.png",
      height: "45vh",
      maxHeight: "300px",
    },
    {
      src: "/assets/img/bg/pokemon-grass-3.png",
      transform: "rotateY(180deg)",
      height: "30vh",
      maxHeight: "220px",
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
            right={pokemons[element][0].right || "100%"}
            top={pokemons[element][0].top || "20%"}
          >
            <Image
              height={pokemons[element][0].height || "250px"}
              maxHeight={pokemons[element][0].maxHeight || "none"}
              maxWidth={"none"}
              src={pokemons[element][0].src}
              transform={pokemons[element][0].transform}
              alt="Pokemon n°1"
            />
          </Box>
          <Box
            pos="absolute"
            bottom="-10%"
            left={pokemons[element][1].left || "102%"}
          >
            <Image
              height={pokemons[element][1].height || "250px"}
              maxWidth={"none"}
              maxHeight={pokemons[element][1].maxHeight || "none"}
              src={pokemons[element][1].src}
              transform={pokemons[element][1].transform}
              alt="Pokemon n°2"
            />
          </Box>
          <Box
            pos="absolute"
            right="0%"
            top="0%"
            left={pokemons[element][2].left || "105%"}
          >
            <Image
              height={pokemons[element][2].height || "250px"}
              maxWidth={"none"}
              maxHeight={pokemons[element][2].maxHeight || "none"}
              src={pokemons[element][2].src}
              transform={pokemons[element][2].transform}
              alt="Pokemon n°3"
            />
          </Box>
        </Box>
      ))}
    </>
  );
};

export default PokemonsBackground;

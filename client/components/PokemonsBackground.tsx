import React, { useState, useEffect, useMemo } from "react";
import {
  Image,
  Box,
  ResponsiveValue,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import { useWatch, Control } from "react-hook-form";
import { Element, Select } from "~@types/CardGenerator";

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

const PokemonsBackground = ({ control }: Props) => {
  const path = useColorModeValue("/assets/img/bg/", "/assets/img/bg/pixel/");
  const { colorMode } = useColorMode();
  const pokemons: Record<Element, BgPokemon[]> = useMemo(
    () => ({
      water: [
        {
          src: "pokemon-water-1.webp",
          transform: colorMode === "dark" ? "rotate(0deg)" : "rotate(20deg)",
          right: colorMode === "dark" ? "105%" : null,
          height: "35vh",
          maxHeight: "240px",
        },
        {
          src: "pokemon-water-2.webp",
          height: "60vh",
          maxHeight: colorMode === "dark" ? "350px" : "475px",
        },
        {
          src: "pokemon-water-3.webp",
          height: "25vh",
          maxHeight: "200px",
        },
      ],
      psychic: [
        {
          src: "pokemon-psychic-1.webp",
          transform: colorMode === "dark" ? null : "rotate(20deg)",
          right: colorMode === "dark" ? "105%" : null,
          height: "30vh",
          maxHeight: "240px",
        },
        {
          src: "pokemon-psychic-2.webp",
          transform: "rotateY(180deg)",
          height: "40vh",
          maxHeight: "305px",
        },
        {
          src: "pokemon-psychic-3.webp",
          height: "30vh",
          maxHeight: "255px",
        },
      ],
      normal: [
        {
          src: "pokemon-normal-1.webp",
          transform: colorMode === "dark" ? null : "rotate(20deg)",
          right: colorMode === "dark" ? "105%" : null,
          height: "34vh",
          maxHeight: "270px",
        },
        {
          src: "pokemon-normal-4.webp",
          height: "55vh",
          maxHeight: "440px",
          left: colorMode === "dark" ? "90%" : null,
        },
        {
          src: "pokemon-normal-3.webp",
          height: "25vh",
          maxHeight: "190px",
          left: "110%",
        },
      ],
      fire: [
        {
          src: "pokemon-fire-1.webp",
          transform: colorMode === "dark" ? null : "translateX(-28px)",
          right: colorMode === "dark" ? "105%" : "100%",
          height: "35vh",
          maxHeight: "260px",
        },
        {
          src: "pokemon-fire-2.webp",
          height: "45vh",
          maxHeight: "340px",
        },
        {
          src: "pokemon-fire-3.webp",
          height: "35vh",
          maxHeight: "250px",
        },
      ],
      fighting: [
        {
          src: "pokemon-fighting-1.webp",
          height: "35vh",
          maxHeight: "260px",
          right: "103%",
        },
        {
          src: "pokemon-fighting-3.webp",
          left: colorMode === "dark" ? "105%" : { base: "80%", xl: "93%" },
          height: "50vh",
          maxHeight: "380px",
        },
        {
          src: "pokemon-fighting-4.webp",
          height: "25vh",
          maxHeight: "180px",
        },
      ],
      electric: [
        {
          src: "pokemon-electric-1.webp",
          transform: colorMode === "dark" ? null : "rotateZ(55deg)",
          height: "45vh",
          maxHeight: "270px",
        },
        {
          src: "pokemon-electric-3.webp",
          height: "50vh",
          maxHeight: "380px",
          transform: colorMode === "dark" ? "translateX(-15%)" : null,
        },
        {
          src: "pokemon-electric-2.webp",
          height: "30vh",
          maxHeight: "180px",
        },
      ],
      grass: [
        {
          src: "pokemon-grass-2.webp",
          transform: "rotateY(180deg) ",
          height: "50vh",
          maxHeight: "370px",
          right: "103%",
          top: "10%",
        },
        {
          src: "pokemon-grass-1.webp",
          height: "45vh",
          maxHeight: "300px",
        },
        {
          src: "pokemon-grass-3.webp",
          height: "30vh",
          maxHeight: "220px",
        },
      ],
    }),
    [colorMode]
  );
  const selectedType: Select<Element> = useWatch({
    control,
    name: "type",
  });

  const [isVariant, setVariant] = useState(true);

  useEffect(() => {
    setVariant(!isVariant);
  }, [selectedType?.value]);

  return (
    <Box
      display="inline-flex"
      pos="absolute"
      top="50%"
      left="50%"
      transform="translateY(-50%) translateX(-50%)"
      maxW="500px"
      maxH="700px"
      h="100%"
      w="100%"
      justifyContent="center"
    >
      <Box display="inline-flex" pos="relative">
        <Image
          alt="Card shape 2"
          opacity="0"
          src="/assets/img/card-shape.png"
          maxW="500px"
          maxH="700px"
          m="0 auto"
          w="auto"
          minW="100%"
        />
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
                src={path + pokemons[element][0].src}
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
                src={path + pokemons[element][1].src}
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
                src={path + pokemons[element][2].src}
                transform={pokemons[element][2].transform}
                alt="Pokemon n°3"
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PokemonsBackground;

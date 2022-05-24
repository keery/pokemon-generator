import React from "react";
import { Flex, Image, Box } from "@chakra-ui/react";
import { Element } from "~@types/CardGenerator";
import {
  WATER,
  FIRE,
  FIGHTING,
  GRASS,
  NORMAL,
  ELECTRIC,
  PSYCHIC,
  GRADIENTS,
} from "~constants";

interface Props {
  element: Element;
}
const path = "/assets/img/1-gen/";

const getElementInfo = (element: Element) => {
  switch (element) {
    case FIRE:
      return {
        img: `${path}fire.png`,
        style: {
          backgroundImage: GRADIENTS[FIRE],
        },
      };
    case WATER:
      return {
        img: `${path}water.png`,
        style: {
          backgroundImage: GRADIENTS[WATER],
        },
      };
    case FIGHTING:
      return {
        img: `${path}fighting.png`,
        style: {
          backgroundImage: GRADIENTS[FIGHTING],
        },
      };
    case GRASS:
      return {
        img: `${path}grass.png`,
        style: {
          backgroundImage: GRADIENTS[GRASS],
        },
      };
    case NORMAL:
      return {
        img: `${path}normal.png`,
        style: {
          backgroundImage: GRADIENTS[NORMAL],
        },
      };
    case ELECTRIC:
      return {
        img: `${path}electric.png`,
        style: {
          backgroundImage: GRADIENTS[ELECTRIC],
        },
      };
    case PSYCHIC:
      return {
        img: `${path}psychic.png`,
        style: {
          backgroundImage: GRADIENTS[PSYCHIC],
        },
      };
    default:
      return null;
  }
};

const CardElement = ({ element }: Props) => {
  const info = getElementInfo(element);

  if (!info) {
    return null;
  }
  const { img, style } = info;
  return (
    <Flex
      alignItems="center"
      borderRadius="2rem"
      padding="0.2rem 0.8rem 0.2rem 0.3rem"
      textTransform="capitalize"
      fontWeight="bold"
      fontSize="0.8rem"
      backgroundColor="white"
      color="black"
      {...style}
    >
      <Image src={img} width="1.4rem" />
      <Box as="span" pl="0.5rem">
        {element}
      </Box>
    </Flex>
  );
};

export default CardElement;

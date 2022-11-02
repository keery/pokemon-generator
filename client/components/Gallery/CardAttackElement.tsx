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
  amount: string;
}
const path = "/assets/img/1-gen/";

const getElementInfo = (element: Element, amount: string) => {
  switch (element) {
    case FIRE:
      return {
        img: `${path}${amount}-fire.png`,
        style: {
          backgroundImage: GRADIENTS[FIRE],
        },
      };
    case WATER:
      return {
        img: `${path}${amount}-water.png`,
        style: {
          backgroundImage: GRADIENTS[WATER],
        },
      };
    case FIGHTING:
      return {
        img: `${path}${amount}-fighting.png`,
        style: {
          backgroundImage: GRADIENTS[FIGHTING],
        },
      };
    case GRASS:
      return {
        img: `${path}${amount}-grass.png`,
        style: {
          backgroundImage: GRADIENTS[GRASS],
        },
      };
    case NORMAL:
      return {
        img: `${path}${amount}-normal.png`,
        style: {
          backgroundImage: GRADIENTS[NORMAL],
        },
      };
    case ELECTRIC:
      return {
        img: `${path}${amount}-electric.png`,
        style: {
          backgroundImage: GRADIENTS[ELECTRIC],
        },
      };
    case PSYCHIC:
      return {
        img: `${path}${amount}-psychic.png`,
        style: {
          backgroundImage: GRADIENTS[PSYCHIC],
        },
      };
    default:
      return null;
  }
};

const CardAttackElement = ({ element, amount }: Props) => {
  const info = getElementInfo(element, amount);

  if (!info) {
    return null;
  }
  const { img, style } = info;
  return (
    <Flex
      alignItems="center"
      borderRadius="0.6rem"
      padding="0.9rem"
      backgroundColor="white"
      minW="max-content"
      {...style}
    >
      <Image src={img} width="2.6rem" />
    </Flex>
  );
};

export default CardAttackElement;

import React from "react";
import Button, { Props as ButtonProps } from "~src/components/Button";
import { Element } from "~@types/CardGenerator";

const BUTTON_COLORS: Record<Element, { color: string; bg: string[] }> = {
  fighting: {
    bg: ["new.4", "new.1", "new.3"],
    color: "black",
  },
  fire: {
    bg: ["#f86f6f", "new.4", "new.1"],
    color: "white",
  },
  electric: {
    bg: ["new.4", "new.1", "new.3"],
    color: "black",
  },
  grass: {
    bg: ["#6ef6a9", "new.4", "new.1"],
    color: "black",
  },
  normal: {
    bg: ["new.2", "new.4", "new.3"],
    color: "black",
  },
  psychic: {
    bg: ["#e07be1", "new.4", "new.3"],
    color: "black",
  },
  water: {
    bg: ["new.1", "new.4", "new.3"],
    color: "white",
  },
};

interface Props extends ButtonProps {
  element: Element;
}

const ElementButton = ({ element, children, ...rest }: Props) => {
  const { bg, color } = BUTTON_COLORS[element] || BUTTON_COLORS.water;

  return (
    <Button {...rest} layerColors={bg} color={color}>
      {children}
    </Button>
  );
};

export default ElementButton;

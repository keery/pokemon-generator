import React from "react";
import {
  Popover,
  Flex,
  PopoverContent,
  PopoverBody,
  Text,
  PopoverArrow,
  PopoverProps,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

interface Item {
  name: string;
  icon: JSX.Element;
  onClick: () => void;
}

interface Props extends PopoverProps {
  items: Item[];
  position: {
    x: number;
    y: number;
  };
}

const PressMenu = ({ items, isOpen, onClose, position }: Props) => {
  const { t } = useTranslation("generator");

  if (!position) return null;

  return (
    <Popover isOpen={isOpen} onClose={onClose}>
      <PopoverContent
        position="absolute"
        left={`${position.x - 50 < 0 ? 0 : position.x - 50}px`}
        top={`${position.y - 100 < 0 ? 0 : position.y - 100}px`}
      >
        <PopoverArrow />
        <PopoverBody
          color="white"
          borderRadius=".825rem"
          backdropFilter="blur(16px) saturate(180%)"
          bgColor="rgba(17, 25, 40, 0.75)"
          fontSize="0.9rem"
          overflow="hidden"
        >
          {items.map(({ name, icon, onClick }, index) => (
            <Flex
              key={name}
              alignItems="center"
              justifyContent="space-between"
              px="1rem"
              py="0.4rem"
              borderTop={index > 0 ? "1px solid #8d8d8d" : ""}
              _hover={{ bgColor: "#6e6e6e" }}
              cursor="pointer"
              onClick={() => {
                onClick();
                onClose();
              }}
              userSelect="none"
            >
              <Text pr="1.3rem">{t(name)}</Text>
              {icon}
            </Flex>
          ))}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default PressMenu;

import React, { useState } from "react";
import {
  Box,
  HStack,
  BoxProps,
  AspectRatio,
  ChakraProps,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { motion, MotionStyle } from "framer-motion";
import { useWatch, Control, useFormContext } from "react-hook-form";
import Cross from "public/assets/img/cross.svg";
import { Select } from "~constants";
import { useRecoilValue } from "recoil";
import { areaAtom } from "~atoms/area";
import useColorArea from "~hooks/useColorArea";

const styleEl = {
  width: "1.8rem",
  height: "1.8rem",
  borderRadius: "100%",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "50%",
  position: "relative",
  backgroundSize: "contain",
  outline: "none",
};

const stylePreview: BoxProps = {
  display: "block",
  backgroundPosition: "center",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  boxSizing: "content-box",
};

interface Props {
  name: string;
  x: number;
  y: number;
  size?: number;
  removeButton?: boolean;
  control: Control;
  options: Select<any>[];
  prefix?: string;
  icon: JSX.Element;
}

const ButtonList = ({
  name,
  x,
  y,
  size = 3,
  options,
  removeButton = true,
  control,
  prefix = "",
  icon,
}: Props) => {
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const { setValue } = useFormContext();
  const value = useWatch({ control, name });
  const { isVisible: areaIsVisible } = useRecoilValue(areaAtom);
  const areaColor = useColorArea();
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const { colorMode } = useColorMode();
  const style = useColorModeValue(
    {
      layerStyle: "glass",
      borderRadius: "sm",
      bgColor: "rgb(255 255 255 / 60%)",
    },
    {
      layerStyle: "nes-container",
      bgColor: "white",
      borderRadius: "none",
      p: 0,
    }
  );

  return (
    <Box role="group" className="ButtonList" zIndex={9}>
      <Box onClick={onOpen}>{icon}</Box>
      <Popover placement="top" isOpen={isOpen} onClose={onClose}>
        <PopoverTrigger>
          <Box
            left={`${x}%`}
            top={`${y}%`}
            pos="absolute"
            display="inline-block"
            role="group"
            w={`${size}%`}
            cursor="pointer"
          >
            <AspectRatio
              borderRadius="100%"
              border={`2px solid ${areaIsVisible ? areaColor : "transparent"}`}
              transition="box-shadow 200ms, border-color 200ms"
              _groupHover={{
                border: "2px solid #fff",
                shadow: "md",
              }}
              width="100%"
              ratio={1}
              onClick={onOpen}
            >
              <Box
                {...stylePreview}
                bgImage={
                  Boolean(value)
                    ? `assets/img/1-gen/${prefix}${value.value}.png)`
                    : null
                }
                w="100%"
                h="100%"
              />
            </AspectRatio>
          </Box>
        </PopoverTrigger>
        <PopoverContent border="none" w="auto" background="none" {...style}>
          <HStack
            spacing=".5rem"
            p="10px 20px"
            display="inline-flex"
            _before={{
              content: '""',
              display: "block",
              position: "absolute",
              left: "0",
              right: "0",
              height: "30px",
              top: "100%",
            }}
          >
            {removeButton && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  outline: "none",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={(e) => e.preventDefault()}
              >
                {colorMode === "dark" ? (
                  <Image
                    src="/assets/img/pixel/close-circle.png"
                    boxSize="28px"
                    onClick={() => {
                      setValue(name, null);
                    }}
                  />
                ) : (
                  <Icon
                    as={Cross}
                    bgColor="#fff"
                    {...(styleEl as ChakraProps)}
                    color="#c1c1c1"
                    border="1px solid #d8d8d8"
                    transition="box-shadow ease-in-out .1s"
                    onClick={() => {
                      setValue(name, null);
                    }}
                    p={1}
                  />
                )}
              </motion.button>
            )}
            {options.map((item) => {
              const isSelected = value?.value === item.value;
              return (
                <motion.button
                  key={item.value}
                  className={item.value}
                  style={{
                    ...(styleEl as MotionStyle),
                    transition: "opacity 200ms",
                    backgroundImage: `url(/assets/img/1-gen/${prefix}${item.value}.png)`,
                    opacity: isSelected ? 0.5 : 1,
                    cursor: isSelected ? "not-allowed" : "pointer",
                  }}
                  whileHover={{ scale: isSelected ? 1 : 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={isSelected}
                  onClick={() => {
                    setValue(name, item);
                    if (isMobile) onClose();
                  }}
                />
              );
            })}
          </HStack>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default ButtonList;

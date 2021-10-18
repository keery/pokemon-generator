import React from "react";
import { Flex, Box, Text, Image as ChakraImage } from "@chakra-ui/react";
import { Control, useFormContext, useWatch } from "react-hook-form";
import InteractiveIcon from "./InteractiveIcon";
import Delete from "public/assets/img/delete.svg";
import Image from "public/assets/img/image.svg";
import { useTranslation } from "next-i18next";
import { cardAtom } from "~atoms/card";
import { useRecoilValue } from "recoil";

interface Props {
  control: Control;
  width: number;
  height: number;
  x: number;
  y: number;
  name: string;
  noText?: boolean;
}

const InteractiveFile = ({
  width,
  height,
  x,
  y,
  name,
  control,
  noText = false,
}: Props) => {
  const card = useRecoilValue(cardAtom);
  const { setValue } = useFormContext();
  const value = useWatch({ control, name });
  const { t } = useTranslation("generator");

  if (Boolean(card.selectedImg)) return null;

  if (Boolean(value))
    return (
      <InteractiveIcon
        icon={<Delete />}
        onClick={() => setValue(name, null)}
        position="absolute"
        left={`${x}%`}
        top={`${y}%`}
        aria-label="Delete main image"
      />
    );

  return (
    <Flex
      border="2px transparent"
      cursor="pointer"
      position="absolute"
      left={`${x}%`}
      top={`${y}%`}
      height={`${height}%`}
      width={`${width}%`}
      onClick={() => document.getElementById(name).click()}
      alignItems="center"
      justifyContent="center"
      role="group"
    >
      {name === "mainImage" ? (
        <Box
          transition="opacity 300ms"
          opacity={0}
          _groupHover={{
            opacity: 1,
          }}
        >
          <Box
            pos="absolute"
            left="12%"
            right="0"
            top="0"
            height="7.8%"
            backdropFilter="blur(8px) saturate(180%)"
            bgColor="rgb(255 255 255 / 65%)"
          />
          <Box
            pos="absolute"
            left="0"
            right="0"
            top="7.8%"
            height="92.2%"
            backdropFilter="blur(8px) saturate(180%)"
            bgColor="rgb(255 255 255 / 65%)"
          />
          <ChakraImage
            src="assets/img/1-gen/slice-stage-transparent.png"
            pos="absolute"
            left="-2.4%"
            w="20.7%"
            top="-3.2%"
            userSelect="unset"
            unselectable="on"
            pointerEvents="none"
          />
        </Box>
      ) : (
        <Box
          transition="opacity 300ms"
          pos="absolute"
          left="0"
          right="0"
          top="0"
          bottom="0"
          opacity={0}
          backdropFilter="blur(8px) saturate(180%)"
          bgColor="rgb(255 255 255 / 55%)"
          _groupHover={{
            opacity: 1,
          }}
        />
      )}

      <Flex
        color="main"
        direction="column"
        transform="translateY(20px)"
        transition="opacity 300ms, transform 300ms"
        opacity={0}
        _groupHover={{ opacity: 1, transform: "translateY(0)" }}
        maxW="60%"
      >
        <Flex fontSize="10rem" justifyContent="center">
          <Image />
        </Flex>
        {!noText && (
          <Text textAlign="center" fontWeight="bold" fontSize="1.3rem">
            {t("choosePicture")}
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default InteractiveFile;

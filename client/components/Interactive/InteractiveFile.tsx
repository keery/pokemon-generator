import React from "react";
import { Flex, Box, Text, Image as ChakraImage } from "@chakra-ui/react";
import { Control, useFormContext, useWatch } from "react-hook-form";
import InteractiveIcon, {
  Props as InteractiveIconProps,
} from "./InteractiveIcon";
import Delete from "public/assets/img/delete.svg";
import Image from "public/assets/img/image.svg";
import { useTranslation } from "next-i18next";
import { BASIC } from "~constants";
import { areaAtom } from "~atoms/area";
import { useRecoilValue } from "recoil";

interface Props {
  control: Control;
  width: number;
  height: number;
  x: number;
  y: number;
  name: string;
  noText?: boolean;
  icon: Omit<InteractiveIconProps, "icon">;
}

const InteractiveFile = ({
  width,
  height,
  x,
  y,
  name,
  control,
  noText = false,
  icon,
}: Props) => {
  const { isVisible } = useRecoilValue(areaAtom);
  const { setValue } = useFormContext();
  const [value, stage] = useWatch({ control, name: [name, "stage"] });
  const { t } = useTranslation("generator");

  return (
    <Box
      role="group"
      onClick={() => {
        if (Boolean(value)) {
          setValue(name, null);
        } else {
          document.getElementById(name).click();
        }
      }}
    >
      {Boolean(value) ? (
        <InteractiveIcon
          icon={<Delete fill="#fe5b54" fontSize="1.7rem" />}
          {...icon}
          p={0}
          borderRadius="100%"
          label={""}
        />
      ) : (
        <InteractiveIcon icon={<Image width="1rem" />} {...icon} />
      )}

      {!Boolean(value) && (
        <Flex
          border="2px transparent"
          cursor="pointer"
          position="absolute"
          left={`${x}%`}
          top={`${y}%`}
          height={`${height}%`}
          width={`${width}%`}
          alignItems="center"
          justifyContent="center"
          role="group"
        >
          {name === "mainImage" ? (
            <Box
              transition="opacity 300ms"
              opacity={1}
              _groupHover={{
                opacity: 1,
              }}
            >
              <Box
                pos="absolute"
                left={stage.value === BASIC ? 0 : "12%"}
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
              {stage.value !== BASIC && (
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
              )}
            </Box>
          ) : (
            <Box
              transition="opacity 300ms"
              pos="absolute"
              left="0"
              right="0"
              top="0"
              bottom="0"
              opacity={isVisible ? 1 : 0}
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
            transition="opacity 300ms, transform 300ms"
            opacity={isVisible ? 1 : 0}
            transform={isVisible ? "translateY(0)" : "translateY(20px)"}
            _groupHover={{ opacity: 1, transform: "translateY(0)" }}
            maxW="60%"
            alignItems="center"
          >
            <Flex
              w={name === "mainImage" ? "60%" : "1rem"}
              justifyContent="center"
            >
              <Image width="100%" />
            </Flex>
            {!noText && (
              <Text
                textAlign="center"
                fontWeight="bold"
                fontSize="1.3rem"
                whiteSpace="nowrap"
              >
                {t("choosePicture")}
              </Text>
            )}
          </Flex>
        </Flex>
      )}
    </Box>
  );
};

export default InteractiveFile;

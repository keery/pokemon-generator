import React from "react";
import { RgbaColorPicker } from "react-colorful";
import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Square,
  useDisclosure,
  AspectRatio,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useController, useFormContext } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { getRgbaColor } from "~utils/helper";
import dynamic from "next/dynamic";
import OptionButton from "~components/PanelOptions/OptionButton";

const ColorPicker = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation("generator");
  const { control } = useFormContext();
  const { field } = useController({
    name: "bgColor",
    control,
  });
  const border = useColorModeValue("solid white", "solid black");
  const fontSize = useColorModeValue("0.9rem", "xs");

  return (
    <Popover isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <AspectRatio
          w={{ base: "30px", sm: "40px" }}
          cursor="pointer"
          ratio={1}
        >
          <OptionButton
            _hover={{
              bgColor: "transparent",
            }}
            _active={{
              bgColor: "transparent",
            }}
            icon={
              <Box h="100%" w="100%" p={1}>
                <Square
                  bgColor={getRgbaColor(field.value)}
                  size="100%"
                  borderRadius="100%"
                  border={border}
                  borderWidth={{ base: "3px", sm: "4px" }}
                />
              </Box>
            }
            onClick={onOpen}
            label={t("colorBg")}
            keyboard_shortcut={["ctrl", "b"]}
            p={0}
            w="100%"
            h="100%"
          />
        </AspectRatio>
      </PopoverTrigger>
      <PopoverContent
        zIndex={9999}
        border="none"
        w="fit-content"
        borderRadius="sm"
        layerStyle="glass"
        bgColor="rgb(255, 255, 255)"
        boxShadow="none"
        mx={2}
        _focus={{
          boxShadow: "none",
        }}
      >
        <PopoverBody p={0}>
          <Text
            display={{ base: "block", xl: "none" }}
            fontWeight="600"
            textTransform="uppercase"
            fontSize={fontSize}
            py={2}
            color="text"
            textAlign="center"
          >
            {t("colorBg")}
          </Text>
          <RgbaColorPicker color={field.value} onChange={field.onChange} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default dynamic(() => Promise.resolve(ColorPicker), {
  ssr: false,
});

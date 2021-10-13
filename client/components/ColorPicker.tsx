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

  return (
    <Popover isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <Box h="40px" w="100%" cursor="pointer">
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
                  h="100%"
                  w="100%"
                  borderRadius="100%"
                  border="4px solid white"
                />
              </Box>
            }
            onClick={onOpen}
            label={t("colorBg")}
            keyboard_shortcut={["ctrl", "b"]}
          />
        </Box>
      </PopoverTrigger>
      <PopoverContent
        zIndex={9999}
        border="none"
        w="fit-content"
        bgColor="transparent"
        boxShadow="none"
        _focus={{
          boxShadow: "none",
        }}
      >
        <PopoverBody>
          <RgbaColorPicker color={field.value} onChange={field.onChange} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default dynamic(() => Promise.resolve(ColorPicker), {
  ssr: false,
});

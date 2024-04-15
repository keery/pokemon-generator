import React, { useEffect, useMemo, useState, useCallback } from "react";
import Eye from "public/assets/img/eye.svg";
import EyeClose from "public/assets/img/eye-close.svg";
import Help from "public/assets/img/help.svg";
import {
  Box,
  Text,
  Flex,
  Square,
  Portal,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  useColorMode,
  Image,
} from "@chakra-ui/react";
import OptionButton from "~src/components/PanelOptions/OptionButton";
import { useTranslations } from "next-intl";
import { areaAtom } from "~atoms/area";
import { useRecoilState } from "recoil";
import { useBreakpointValue } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const KEY_CACHE = "pk-no-help";
const VALUE_CACHE = "ok";

const Overlay = () => (
  <Box
    zIndex={10}
    pos="fixed"
    left="0"
    top="0"
    right="0"
    bottom="0"
    bgColor="blackAlpha.600"
  />
);

const EyeButtonHelp = ({ icon, setHelpVisible }) => {
  const t = useTranslations("generator");
  const onClose = () => setHelpVisible(false);

  const dontShowAgain = useCallback(() => {
    localStorage.setItem(KEY_CACHE, VALUE_CACHE);
    onClose();
  }, []);

  return (
    <Popover defaultIsOpen placement="right" onClose={onClose}>
      <PopoverTrigger>
        <Box>{icon}</Box>
      </PopoverTrigger>
      <Portal>
        <Overlay />
        <PopoverContent zIndex={110} borderRadius="sm">
          <Box
            pos="absolute"
            right="102.9%"
            top="50%"
            transform="translateY(-50%)"
            onClick={onClose}
          >
            {icon}
          </Box>
          <PopoverArrow />
          <PopoverBody p={0}>
            <Flex alignItems="center" px={4} py={2} left="130%" top="50%">
              <Square
                bgColor="main"
                size="2.3rem"
                borderRadius="sm"
                mr={3}
                fontSize="1.4rem"
              >
                <Help fill="white" />
              </Square>
              <Box whiteSpace="pre" flex={1}>
                <Flex justifyContent="space-between" alignItems="center">
                  <Text fontWeight="600" fontSize="1.1rem">
                    {t("help")}
                  </Text>
                  <Text
                    textDecoration="underline"
                    color="gray.500"
                    fontSize="0.8rem"
                    cursor="pointer"
                    _hover={{ color: "gray.600" }}
                    onClick={dontShowAgain}
                  >
                    {t("dontDisplay")}
                  </Text>
                </Flex>
                <Text fontSize="0.95rem">{t("eyeButtonHelp")}</Text>
              </Box>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

const EyeButton = () => {
  const t = useTranslations("generator");
  const [{ isVisible }, setArea] = useRecoilState(areaAtom);
  const isMobile = useBreakpointValue({ base: true, xl: false });
  const [isHelpVisible, setHelpVisible] = useState(true);
  const isDontShowAgain = localStorage.getItem(KEY_CACHE) || null;
  const { colorMode } = useColorMode();

  const icon = useMemo(() => {
    const shadow = { filter: "drop-shadow(0px 0px 6px #fff)" };

    if (isVisible) {
      return colorMode === "dark" ? (
        <Image src="/assets/img/pixel/eye.png" w="24px" />
      ) : (
        <Eye {...(isHelpVisible && shadow)} />
      );
    } else {
      return colorMode === "dark" ? (
        <Image src="/assets/img/pixel/eye-close.png" boxSize="24px" />
      ) : (
        <EyeClose {...(isHelpVisible && shadow)} />
      );
    }
  }, [isVisible, colorMode]);

  const Button = (
    <OptionButton
      icon={icon}
      onClick={() => setArea((s) => ({ ...s, isVisible: !s.isVisible }))}
      label={isVisible ? t("hideZone") : t("showZone")}
      keyboard_shortcut={["ctrl", "h"]}
    />
  );

  useEffect(() => {
    setArea((s) => ({ ...s, isVisible: isMobile }));
  }, [isMobile]);

  return (
    <>
      <Box pos="relative">
        {!isMobile && isHelpVisible && isDontShowAgain !== VALUE_CACHE ? (
          <EyeButtonHelp icon={Button} setHelpVisible={setHelpVisible} />
        ) : (
          Button
        )}
      </Box>
    </>
  );
};

export default dynamic(() => Promise.resolve(EyeButton), {
  ssr: false,
});

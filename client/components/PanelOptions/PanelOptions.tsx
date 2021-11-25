import React from "react";
import {
  Stack,
  Flex,
  StackDivider,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import Print from "public/assets/img/print.svg";
import Download from "public/assets/img/download.svg";
import ColorPicker from "~components/ColorPicker";
import OptionButton from "~components/PanelOptions/OptionButton";
import ResetButton from "~components/PanelOptions/ResetButton";
import EyeButton from "~components/PanelOptions/EyeButton";
import FormButton from "~components/PanelOptions/FormButton";
import PrevNextButtons from "./PrevNextButtons";
import { exportCard, printCard } from "~utils/card";

const PanelOptions = () => {
  const { t } = useTranslation("generator");
  const hasDivider = useBreakpointValue({ base: true, sm: false });
  const { colorMode } = useColorMode();
  const transform = useColorModeValue("translateX(0)", "translateX(-4px)");

  return (
    <Flex
      mt={{ base: 0, xl: 14 }}
      alignItems="flex-start"
      alignSelf={{ base: "center", xl: "flex-start" }}
      direction="column"
      pos="relative"
      zIndex={9}
      w={{ base: "100%", sm: "auto" }}
    >
      <Stack
        direction={{ base: "row", sm: "column" }}
        borderRadius="sm"
        layerStyle={colorMode === "dark" ? "nes-container" : "glass"}
        p={colorMode === "dark" ? 0 : 1.5}
        spacing={{ base: 0, sm: 4 }}
        transform={{ base: transform, sm: "translateX(0)" }}
        pos="relative"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        divider={hasDivider && <StackDivider />}
      >
        <FormButton />
        <OptionButton
          icon={
            colorMode === "dark" ? (
              <Image src="/assets/img/pixel/download.png" boxSize="24px" />
            ) : (
              <Download />
            )
          }
          onClick={exportCard}
          label={t("downloadCard")}
          keyboard_shortcut={["ctrl", "d"]}
        />
        <OptionButton
          icon={
            colorMode === "dark" ? (
              <Image src="/assets/img/pixel/print.png" boxSize="24px" />
            ) : (
              <Print />
            )
          }
          onClick={printCard}
          label={t("printCard")}
          keyboard_shortcut={["ctrl", "p"]}
        />
        <ResetButton />
        <PrevNextButtons />
        <EyeButton />
        <ColorPicker />
      </Stack>
    </Flex>
  );
};

export default PanelOptions;

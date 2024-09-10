import React from "react";
import {
  Stack,
  Flex,
  StackDivider,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations();
  const hasDivider = useBreakpointValue({ base: true, sm: false });

  return (
    <Flex
      mt={{ base: 0, xl: 14 }}
      alignItems="flex-start"
      alignSelf={{ base: "center", xl: "flex-start" }}
      direction="column"
      pos={{ base: "fixed", sm: "relative" }}
      bottom="0"
      zIndex={9}
      w={{ base: "100%", sm: "auto" }}
    >
      <Stack
        direction={{ base: "row", sm: "column" }}
        borderRadius={{ base: "none", sm: "sm" }}
        layerStyle={"glass"}
        p={1.5}
        spacing={{ base: 0, sm: 4 }}
        transform={"translateX(0)"}
        pos="relative"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        divider={hasDivider && <StackDivider />}
      >
        <FormButton />
        <OptionButton
          icon={<Download />}
          onClick={exportCard}
          label={t("downloadCard")}
          keyboard_shortcut={["ctrl", "d"]}
        />
        <OptionButton
          icon={<Print />}
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

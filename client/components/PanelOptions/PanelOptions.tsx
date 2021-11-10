import React from "react";
import {
  Stack,
  Flex,
  StackDivider,
  useBreakpointValue,
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

const printCard = () => {
  window.print();
};

const exportCard = () => {
  const date = new Date();

  let name = `pokemon-card`;
  name += `-${date.getFullYear()}`;
  name += `-${date.getMonth()}`;
  name += `-${date.getDate()}`;
  name += `-${date.getHours()}`;
  name += `-${date.getMinutes()}`;
  name += `-${date.getSeconds()}`;
  name += `.jpg`;

  const canva = document.getElementsByTagName("canvas");
  const link = document.createElement("a");
  link.download = name;
  link.href = canva[0].toDataURL();
  link.click();
};

const PanelOptions = () => {
  const { t } = useTranslation("generator");
  const hasDivider = useBreakpointValue({ base: true, sm: false });

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
        layerStyle="glass"
        p={1.5}
        spacing={{ base: 0, sm: 4 }}
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

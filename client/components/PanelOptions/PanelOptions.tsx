import React from "react";
import { VStack, IconButton, Flex, AspectRatio } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import Print from "public/assets/img/print.svg";
import Menu from "public/assets/img/menu.svg";
import Download from "public/assets/img/download.svg";
import ColorPicker from "~components/ColorPicker";
import OptionButton from "~components/PanelOptions/OptionButton";
import ResetButton from "~components/PanelOptions/ResetButton";

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

  return (
    <Flex
      mt={6}
      alignItems="flex-start"
      direction="column"
      pos="relative"
      zIndex={100}
    >
      <AspectRatio ratio={1} w="100%" mb={6}>
        <IconButton
          color="main"
          fontSize="1.7rem"
          borderRadius="sm"
          aria-label="icon"
          icon={<Menu />}
          onClick={() => null}
          layerStyle="glass"
        />
      </AspectRatio>
      <VStack
        borderRadius="sm"
        layerStyle="glass"
        p={1.5}
        spacing={4}
        pos="relative"
      >
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
        <ColorPicker />
      </VStack>
    </Flex>
  );
};

export default PanelOptions;

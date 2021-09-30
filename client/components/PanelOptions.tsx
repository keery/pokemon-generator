import React from "react";
import {
  VStack,
  Tooltip,
  IconButton,
  Flex,
  AspectRatio,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import Print from "public/assets/img/print.svg";
import Reset from "public/assets/img/reset.svg";
import Menu from "public/assets/img/menu.svg";
import Download from "public/assets/img/download.svg";

const printCard = () => {
  window.print();
};

const OptionButton = ({ icon, label, onClick, ...rest }) => (
  <Tooltip hasArrow shouldWrapChildren label={label} aria-label={label}>
    <IconButton
      icon={icon}
      onClick={onClick}
      color="main"
      aria-label="icon"
      borderRadius="sm"
      bgColor="transparent"
      _hover={{
        bgColor: "white",
      }}
      fontSize="1.7rem"
      backdropFilter="none"
      border="none"
      {...rest}
    />
  </Tooltip>
);

const PanelOptions = () => {
  const { t } = useTranslation("generator");
  return (
    <Flex mt={6} alignItems="flex-start" direction="column">
      <AspectRatio ratio={1} w="100%" mb={6}>
        <IconButton
          color="main"
          fontSize="1.7rem"
          borderRadius="sm"
          aria-label="icon"
          icon={<Menu />}
          onClick={() => null}
        />
      </AspectRatio>
      <VStack borderRadius="sm" p={1.5} layerStyle="glass" spacing={4}>
        <OptionButton
          icon={<Download />}
          onClick={() => null}
          label={t("downloadCard")}
        />
        <OptionButton
          icon={<Print />}
          onClick={printCard}
          label={t("printCard")}
        />
        <OptionButton
          icon={<Reset />}
          onClick={() => null}
          label={t("resetCard")}
        />
      </VStack>
    </Flex>
  );
};

export default PanelOptions;

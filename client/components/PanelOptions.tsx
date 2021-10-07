import React from "react";
import {
  VStack,
  Tooltip,
  IconButton,
  IconButtonProps,
  Flex,
  AspectRatio,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import Print from "public/assets/img/print.svg";
import Reset from "public/assets/img/reset.svg";
import Menu from "public/assets/img/menu.svg";
import Download from "public/assets/img/download.svg";
import ColorPicker from "~components/ColorPicker";

const printCard = () => {
  window.print();
};

interface Props extends Omit<IconButtonProps, "aria-label"> {
  icon: JSX.Element;
  label?: string;
  withTooltip?: boolean;
}

const OptionButton = ({
  icon,
  label,
  onClick,
  withTooltip = true,
  ...rest
}: Props) => {
  const Button = (
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
  );

  if (withTooltip)
    return (
      <Tooltip hasArrow shouldWrapChildren label={label} aria-label={label}>
        {Button}
      </Tooltip>
    );

  return Button;
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
        <OptionButton icon={<Download />} label={t("downloadCard")} />
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
        <ColorPicker />
      </VStack>
    </Flex>
  );
};

export default PanelOptions;

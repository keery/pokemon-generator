import React from "react";
import { Box, Button, BoxProps } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

interface LineProps extends BoxProps {
  isOpen: boolean;
}

const Line = ({ isOpen, ...rest }: LineProps) => {
  return (
    <Box
      left="0"
      top="0"
      width="100%"
      height="2px"
      bgColor={isOpen ? "white" : "main"}
      transition="0.3s all ease-in-out"
      {...rest}
    />
  );
};

interface Props {
  onClick: () => void;
  isOpen: boolean;
}

const Burger = ({ onClick, isOpen }: Props) => {
  const { t } = useTranslation("common");

  return (
    <Button
      title={isOpen ? t("menu.close") : t("menu.open")}
      role="group"
      padding="0.9rem 0.5rem"
      overflow="hidden"
      height="50px"
      width="50px"
      onClick={onClick}
      variant="unstyled"
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
      alignItems="flex-end"
      zIndex={10}
      layerStyle="glass"
      borderRadius="100%"
    >
      <Line
        _groupHover={{
          transform: "translateX(-8px)",
        }}
        isOpen={isOpen}
      />
      <Line
        _groupHover={{
          transform: "translateX(10px)",
          w: "50%",
        }}
        isOpen={isOpen}
      />
      <Line
        w="55%"
        _groupHover={{
          transform: "translateX(-8px)",
          w: "100%",
        }}
        isOpen={isOpen}
      />
    </Button>
  );
};

export default Burger;

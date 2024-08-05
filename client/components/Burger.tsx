import React from "react";
import { Box, BoxProps, Circle } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import Button from "~components/Button";

interface LineProps extends BoxProps {
  isOpen: boolean;
}

const Line = ({ isOpen, ...rest }: LineProps) => {
  return (
    <Box
      left="0"
      top="0"
      width="100%"
      height="1px"
      bgColor={"white"}
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
  const t = useTranslations();

  return (
    <Button
      as={Circle}
      title={isOpen ? t("menu.close") : t("menu.open")}
      padding="1.2rem 0.9rem"
      width="3.2rem"
      height="3.2rem"
      onClick={onClick}
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
      alignItems="flex-end"
      zIndex={10}
      borderRadius="100%"
      cursor="pointer"
      hasNoText
      layerColors={["new.2", "new.4", "new.3"]}
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

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Button, Box } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { Card } from "~@types/Card";
import { GRADIENTS, GRADIENTS_COLOR } from "~constants";

interface Props {
  winner: Card;
}

const WinnerConfettiButton = ({ winner }: Props) => {
  const { t } = useTranslation("gallery");
  const [isLoading, setLoading] = useState(false);

  return (
    <Button
      isLoading={isLoading}
      width="fit-content"
      mt="1.5rem"
      background={GRADIENTS[winner.element]}
      color={GRADIENTS_COLOR[winner.element]}
      onClick={() => {
        confetti({
          zIndex: 10000,
          particleCount: 150,
          spread: 90,
        });
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }}
      padding="1.4rem 1.6rem"
      borderRadius="0.6rem"
      overflow="hidden"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: "-100%",
        width: "100%",
        height: "100%",
        background:
          "linear-gradient( 120deg, transparent, rgba(255,255,255, 0.4), transparent )",
        transition: "all 650ms",
      }}
      _hover={{
        boxShadow: "1px 1px 25px 0px rgb(34 34 34 / 11%)",
        _before: {
          left: "100%",
        },
      }}
      _active={{
        transform: "scale(0.95)",
      }}
    >
      {t("winner.congratule")}
      <Box fontSize="1.2rem" ml="0.8rem">
        🎉
      </Box>
    </Button>
  );
};

export default WinnerConfettiButton;

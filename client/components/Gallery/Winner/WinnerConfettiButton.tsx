import React, { useState } from "react";
import { Box, Spinner } from "@chakra-ui/react";
import confetti from "canvas-confetti";
import { useTranslations } from "next-intl";
import { Winner } from "~@types/Winner";
import { getKey } from "~hooks/useWinner";
import useClapWinner from "~hooks/useClapWinner";
import { useQueryClient } from "react-query";
import ElementButton from "~components/ElementButton";

interface Props {
  winner: Winner;
}

const WinnerConfettiButton = ({ winner }: Props) => {
  const t = useTranslations();
  const [isLoading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const { refetch } = useClapWinner();

  const onClick = () => {
    confetti({
      zIndex: 10000,
      particleCount: 150,
      spread: 90,
    });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);

    refetch();
    queryClient.setQueryData(getKey(), (prev: Winner) => {
      return {
        ...winner,
        clap: prev.clap + 1,
      };
    });
  };

  return (
    <ElementButton
      element={winner.card.element}
      isDisabled={isLoading}
      mt="1.5rem"
      onClick={onClick}
      hasNoText
      fontSize="1rem"
      w="fit-content"
      pr={isLoading ? "2.5rem" : "0.7rem"}
    >
      {t("winner.congratule")}
      {isLoading ? (
        <Spinner ml="1rem" />
      ) : (
        <Box
          fontSize="1.2rem"
          ml="0.8rem"
          backgroundColor="white"
          padding="0.6rem 1.1rem"
          borderRadius="1.6rem"
        >
          <Box as="span" mr="0.6rem" color="black">
            {winner.clap}
          </Box>
          🎉
        </Box>
      )}
    </ElementButton>
  );
};

export default WinnerConfettiButton;

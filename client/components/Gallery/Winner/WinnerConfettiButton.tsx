import React, { useState } from "react";
import { Box, Spinner } from "@chakra-ui/react";
import confetti from "canvas-confetti";
import { useTranslation } from "next-i18next";
import { Winner } from "~@types/Winner";
import { getKey } from "~hooks/useWinner";
import useClapWinner from "~hooks/useClapWinner";
import { GRADIENTS } from "~constants";
import { useQueryClient } from "react-query";
import Button from "~components/Button";

interface Props {
  winner: Winner;
}

const WinnerConfettiButton = ({ winner }: Props) => {
  const { t } = useTranslation("gallery");
  const [isLoading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const { refetch } = useClapWinner();

  const gradient = GRADIENTS[winner.card.element] || GRADIENTS.water;

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
    <Button
      isDisabled={isLoading}
      mt="1.5rem"
      layerColors={["new.4", "new.1", "new.1"]}
      // background={gradient}
      // color={gradient}
      onClick={onClick}
      hasNoText
      fontSize="1rem"
      w="fit-content"
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
          <Box as="span" mr="0.6rem">
            {winner.clap}
          </Box>
          🎉
        </Box>
      )}
    </Button>
  );
};

export default WinnerConfettiButton;

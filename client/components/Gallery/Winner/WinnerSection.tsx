import React from "react";
import { Box } from "@chakra-ui/react";
import WinnerGlass from "~components/Gallery/Winner/WinnerGlass";
import useWinner from "~hooks/useWinner";

const WinnerSection = () => {
  const { data: winner, isLoading } = useWinner();

  return (
    <>
      <Box height="120vh" pt="3.9rem" as="section" pos="relative">
        {!isLoading && <WinnerGlass winner={winner} />}
      </Box>
    </>
  );
};

export default WinnerSection;

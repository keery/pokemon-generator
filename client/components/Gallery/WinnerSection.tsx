import React from "react";
import { Box } from "@chakra-ui/react";
import WinnerGlass from "~components/Gallery/WinnerGlass";

const WinnerSection = () => {
  return (
    <Box h="1800px" bgColor="blue.md" pt="3.9rem" as="section">
      <WinnerGlass />
    </Box>
  );
};

export default WinnerSection;

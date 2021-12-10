import React from "react";
import { Box, AspectRatio } from "@chakra-ui/react";

const HoloCard = () => {
  return (
    <Box
      pos="relative"
      // boxShadow="
      // -5px -5px 5px -5px rgb(0, 231, 255),
      // 5px 5px 5px -5px rgb(255, 0, 231),
      // -7px -7px 10px -5px transparent,
      // 7px 7px 10px -5px transparent,
      // 0 0 5px 0px rgba(255,255,255,0),
      // 0 55px 35px -20px rgba(0, 0, 0, 0.5)"
    >
      <AspectRatio ratio={5 / 7} className="holo-card-container" w="400px">
        <Box
          borderRadius="1.3rem"
          className="holo-card animated"
          position="relative"
          margin="20px"
          bgImage="https://drive.google.com/uc?export=view&id=1UTb8ESvXU90DAX6n3bqExECKm5Xx0Xtd"
          zIndex="10"
          touchAction="none"
          transition="transform 0.5s ease, box-shadow 0.2s ease"
          willChange="transform, filter"
          // backgroundColor="#040712"
          boxShadow="0 55px 35px -20px rgba(0, 0, 0, 0.5)"
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          backgroundPosition="50% 50%"
          transformOrigin="center"
        />
      </AspectRatio>
    </Box>
  );
};

export default HoloCard;

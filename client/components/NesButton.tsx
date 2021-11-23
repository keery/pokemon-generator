import React, { useState } from "react";
import { Box, Text, Flex, useColorMode, Switch } from "@chakra-ui/react";

const NesButton = () => {
  const { toggleColorMode } = useColorMode();
  const [isOn, setOn] = useState(false);
  return (
    <Flex
      //   id="nes-toggle"
      className={isOn ? "on" : ""}
      borderRadius="100%"
      //   boxSize="60px"
      alignItems="center"
      //   layerStyle="glass"
      cursor="pointer"
      border="none"
      //   onClick={toggleColorMode}
      role="group"
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
    >
      {/* <Box
        transform="scale(0.5)"
        pos="relative"
        display="inline-block"
        w="60px"
        h="40px"
        // transition="transform ease-in-out 300ms"
        // _groupHover={{
        //   transform: "scale(0.9)",
        // }}
        _after={{
          content: '""',
          color: "#d7d7d7",
          pos: "absolute",
          top: "-4px",
          left: "-4px",
          w: "4px",
          h: "4px",
          boxShadow:
            "28px 4px #333, 28px 8px #333, 32px 12px #333, 12px 16px #333, 16px 16px #333, 20px 16px #333, 24px 16px #333, 28px 16px #333, 32px 16px #333, 36px 16px #333, 40px 16px #333, 44px 16px #333, 48px 16px #333, 52px 16px #333, 8px 20px #333, 12px 20px, 16px 20px, 20px 20px, 24px 20px, 28px 20px, 32px 20px, 36px 20px, 40px 20px, 44px 20px, 48px 20px, 52px 20px, 56px 20px #333, 4px 24px #333, 8px 24px, 12px 24px, 16px 24px #333, 20px 24px, 24px 24px, 28px 24px, 32px 24px, 36px 24px, 40px 24px, 44px 24px, 48px 24px #999cf7, 52px 24px, 56px 24px, 60px 24px #333, 4px 28px #333, 8px 28px, 12px 28px #333, 16px 28px #333, 20px 28px #333, 24px 28px, 28px 28px, 32px 28px, 36px 28px, 40px 28px, 44px 28px #7dbb78, 48px 28px, 52px 28px #f40500, 56px 28px, 60px 28px #333, 4px 32px #333, 8px 32px, 12px 32px, 16px 32px #333, 20px 32px, 24px 32px, 28px 32px #333, 32px 32px, 36px 32px #333, 40px 32px, 44px 32px, 48px 32px #f6f504, 52px 32px, 56px 32px, 60px 32px #333, 8px 36px #333, 12px 36px, 16px 36px, 20px 36px, 24px 36px, 28px 36px, 32px 36px, 36px 36px, 40px 36px, 44px 36px, 48px 36px, 52px 36px, 56px 36px #333, 12px 40px #333, 16px 40px #333, 20px 40px #333, 24px 40px #333, 28px 40px #333, 32px 40px #333, 36px 40px #333, 40px 40px #333, 44px 40px #333, 48px 40px #333, 52px 40px #333",
        }}
      /> */}
      <Text fontFamily="nes" fontSize="xs">
        NES
      </Text>
      <Switch
        ml={1}
        colorScheme="blue"
        onChange={toggleColorMode}
        // _checked={{
        //   bgColor: "pokeball",
        // }}
      />
    </Flex>
  );
};

export default NesButton;

import React from "react";
import {
  Box,
  Input as InputChakra,
  InputProps,
  useColorMode,
} from "@chakra-ui/react";
import { Control, useFormContext } from "react-hook-form";

interface Props extends InputProps {
  name: string;
}

const Input = ({ name, ...rest }: Props) => {
  const { colorMode } = useColorMode();
  const { watch, setValue } = useFormContext();
  const value = watch(name);

  return (
    <Box pos="relative" flex={1}>
      {colorMode === "dark" && (
        <Box
          bgColor="white"
          pos="absolute"
          left={"4px"}
          bottom={"4px"}
          right={"4px"}
          top={"4px"}
        />
      )}
      <InputChakra
        variant={colorMode === "dark" ? "nes" : "outline"}
        name={name}
        type="text"
        onChange={(e) => setValue(name, e.target.value)}
        value={value}
        {...rest}
      />
    </Box>
  );
};

export default Input;

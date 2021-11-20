import React from "react";
import {
  Box,
  Input as InputChakra,
  InputProps,
  useColorMode,
} from "@chakra-ui/react";
import { Control, useController, useWatch } from "react-hook-form";

interface Props extends InputProps {
  control: Control;
  name: string;
}

const Input = ({ control, name, ...rest }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { field } = useController({ control, name });
  const value = useWatch({ control, name });

  return (
    <Box pos="relative">
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
        onClick={toggleColorMode}
        name={name}
        type="text"
        onChange={(e) => field.onChange(e.target.value)}
        value={value}
        {...rest}
      />
    </Box>
  );
};

export default Input;

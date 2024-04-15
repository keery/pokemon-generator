import React from "react";
import {
  Textarea as TextareaChakra,
  TextareaProps,
  useColorMode,
  Box,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

interface Props extends TextareaProps {
  name: string;
}

const Textarea = ({ name, ...rest }: Props) => {
  const { watch, setValue } = useFormContext();
  const value = watch(name);
  const { colorMode } = useColorMode();

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
      <TextareaChakra
        variant={colorMode === "dark" ? "nes" : "outline"}
        name={name}
        onChange={(e) => setValue(name, e.target.value)}
        value={value}
        {...rest}
      />
    </Box>
  );
};

export default Textarea;

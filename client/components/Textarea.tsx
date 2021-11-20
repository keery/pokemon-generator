import React from "react";
import {
  Textarea as TextareaChakra,
  TextareaProps,
  useColorMode,
  Box,
} from "@chakra-ui/react";
import { Control, useController, useWatch } from "react-hook-form";

interface Props extends TextareaProps {
  control: Control;
  name: string;
}

const Textarea = ({ control, name, ...rest }: Props) => {
  const { field } = useController({ control, name });
  const value = useWatch({ control, name });
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
        onChange={(e) => field.onChange(e.target.value)}
        value={value}
        {...rest}
      />
    </Box>
  );
};

export default Textarea;

import React from "react";
import {
  Textarea as TextareaChakra,
  TextareaProps,
  Box,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

interface Props extends TextareaProps {
  name: string;
}

const Textarea = ({ name, ...rest }: Props) => {
  const { watch, setValue } = useFormContext();
  const value = watch(name);

  return (
    <Box pos="relative">
      <TextareaChakra
        variant={"outline"}
        name={name}
        onChange={(e) => setValue(name, e.target.value)}
        value={value}
        {...rest}
      />
    </Box>
  );
};

export default Textarea;

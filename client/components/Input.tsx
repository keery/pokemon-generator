import React from "react";
import { Box, Input as InputChakra, InputProps } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

interface Props extends InputProps {
  name: string;
}

const Input = ({ name, ...rest }: Props) => {
  const { watch, setValue } = useFormContext();
  const value = watch(name);

  return (
    <Box pos="relative" flex={1}>
      <InputChakra
        variant={"outline"}
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

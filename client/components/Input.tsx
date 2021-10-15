import React from "react";
import { Input as InputChakra, InputProps } from "@chakra-ui/react";
import { Control, useController, useWatch } from "react-hook-form";

interface Props extends InputProps {
  control: Control;
  name: string;
}

const Input = ({ control, name, ...rest }: Props) => {
  const { field } = useController({ control, name });
  const value = useWatch({ control, name });

  return (
    <InputChakra
      name={name}
      type="text"
      onChange={(e) => field.onChange(e.target.value)}
      value={value}
      {...rest}
    />
  );
};

export default Input;

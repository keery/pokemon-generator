import React from "react";
import { Textarea as TextareaChakra, TextareaProps } from "@chakra-ui/react";
import { Control, useController, useWatch } from "react-hook-form";

interface Props extends TextareaProps {
  control: Control;
  name: string;
}

const Textarea = ({ control, name, ...rest }: Props) => {
  const { field } = useController({ control, name });
  const value = useWatch({ control, name });
  const { fontSize, ref } = useFitText();

  return (
    <TextareaChakra
      name={name}
      onChange={(e) => field.onChange(e.target.value)}
      value={value}
      {...rest}
    />
  );
};

export default Textarea;

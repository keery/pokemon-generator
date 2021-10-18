import React from "react";
import { Box, Input } from "@chakra-ui/react";
import { Control, useController, useWatch } from "react-hook-form";

interface Props {
  name: string;
  x: number;
  y: number;
  height: number;
  width: number;
  fontSize?: number;
  fontFamily?: string;
  control: Control;
  prefix?: string;
}

const InteractiveInput = ({
  name,
  x,
  y,
  height,
  width,
  fontSize,
  fontFamily = "pokename",
  control,
  prefix,
}: Props) => {
  const { field } = useController({ control, name });
  const value = useWatch({ control, name });

  return (
    <Box
      pos="absolute"
      // border="2px solid yellow"
      left={`${x}%`}
      top={`${y}%`}
      height={`${height}%`}
      width={`${width}%`}
    >
      <Input
        variant="unstyled"
        w="100%"
        type="text"
        border="none"
        height="100%"
        color="transparent"
        style={{
          caretColor: "black",
        }}
        fontSize={`${fontSize}px`}
        fontFamily={fontFamily}
        borderRadius="xs"
        _hover={{
          border: "2px solid #fff",
        }}
        _focus={{
          border: "2px solid #fff",
          shadow: "0px 0px 9px #a0c2ff!important",
        }}
        onChange={(event) => {
          field.onChange(
            !!prefix
              ? event.target.value.replace(prefix, "")
              : event.target.value
          );
        }}
        value={value !== "" && prefix ? prefix + value : value}
        name={name}
        autoComplete="off"
        pos="absolute"
        left={0}
        top={0}
        bottom={0}
        right={0}
      />
    </Box>
  );
};

export default InteractiveInput;

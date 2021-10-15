import React from "react";
import { Box, Textarea } from "@chakra-ui/react";
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

const InteractiveTextarea = ({
  name,
  x,
  y,
  height,
  width,
  fontSize,
  fontFamily = "pokevolution",
  control,
}: Props) => {
  const { field } = useController({ control, name });
  const value = useWatch({ control, name });
  return (
    <Box
      pos="absolute"
      left={`${x}%`}
      top={`${y}%`}
      height={`${height}%`}
      width={`${width}%`}
    >
      <Textarea
        pl="1%"
        pr="6.1%"
        py={0.5}
        variant="unstyled"
        name={name}
        type="text"
        fontSize={`${fontSize}px`}
        fontFamily={fontFamily}
        onChange={(event) => field.onChange(event.target.value)}
        value={value}
        borderRadius={0}
        minH="0"
        width="100%"
        border="3px solid transparent"
        height="100%"
        backgroundColor="transparent"
        outline="none"
        resize="none"
        overflow="hidden"
        transition="border ease-in-out 0.08s"
        lineHeight="1"
        color="transparent"
        autoComplete="off"
        style={{
          caretColor: "black",
        }}
        _hover={{
          border: "3px solid #000",
        }}
        _focus={{
          border: "3px solid #000",
        }}
      />
    </Box>
  );
};

export default InteractiveTextarea;

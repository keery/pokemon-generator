import React, { useRef, useEffect } from "react";
import { Box, Input, InputProps } from "@chakra-ui/react";
import { Control, useController, useWatch } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { areaAtom } from "~atoms/area";
import useColorArea from "~hooks/useColorArea";

interface Props extends InputProps {
  name: string;
  x: number;
  y: number;
  height: number;
  width: number;
  fontSize?: number;
  fontFamily?: string;
  control: Control;
  prefix?: string;
  icon: JSX.Element;
  fullWidth: number;
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
  icon,
  fullWidth,
  ...rest
}: Props) => {
  const inputRef = useRef(null);
  const { field } = useController({ control, name });
  const value = useWatch({ control, name });
  const { isVisible } = useRecoilValue(areaAtom);
  const areaColor = useColorArea();

  useEffect(() => {
    new ResizeObserver(() => {
      inputRef.current.style.fontSize =
        (inputRef?.current.clientWidth / fullWidth) * fontSize + "px";
    }).observe(inputRef?.current);
  }, [inputRef?.current, fullWidth]);

  return (
    <Box role="group">
      <Box onClick={() => inputRef?.current.focus()}>{icon}</Box>
      <Box
        pos="absolute"
        left={`${x}%`}
        top={`${y}%`}
        height={`${height}%`}
        width={`${width}%`}
      >
        <Input
          ref={inputRef}
          variant="unstyled"
          w="100%"
          type="text"
          border={`2px solid ${isVisible ? areaColor : "transparent"}`}
          height="100%"
          color="transparent"
          style={{
            caretColor: "black",
          }}
          fontSize={`${fontSize}px`}
          fontFamily={fontFamily}
          borderRadius="xs"
          _groupHover={{
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
          {...rest}
        />
      </Box>
    </Box>
  );
};

export default InteractiveInput;

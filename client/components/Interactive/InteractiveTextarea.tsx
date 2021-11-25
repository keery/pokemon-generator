import React, { useRef, useEffect } from "react";
import { Box, Textarea } from "@chakra-ui/react";
import { Control, useController, useWatch } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { areaAtom } from "~atoms/area";
import useColorArea from "~hooks/useColorArea";
import { observeFieldResize } from "~utils/helper";

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
  icon: JSX.Element;
  fullWidth: number;
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
  icon,
  fullWidth,
}: Props) => {
  const inputRef = useRef(null);
  const { field } = useController({ control, name });
  const value = useWatch({ control, name });
  const { isVisible } = useRecoilValue(areaAtom);
  const areaColor = useColorArea();

  useEffect(() => {
    observeFieldResize(inputRef.current, fullWidth, fontSize);
  }, [inputRef?.current, fullWidth, fontSize]);

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
        <Textarea
          ref={inputRef}
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
          border="2px solid"
          borderColor={isVisible ? areaColor : "transparent"}
          height="100%"
          backgroundColor="transparent"
          outline="none"
          resize="none"
          overflow="hidden"
          transition="border-color ease-in-out 200ms, box-shadow 200ms ease-in-out"
          lineHeight="1"
          color="transparent"
          autoComplete="off"
          style={{
            caretColor: "black",
          }}
          _groupHover={{
            borderColor: "#fff",
          }}
          _focus={{
            border: "2px solid #fff",
            shadow: "0px 0px 9px #a0c2ff!important",
          }}
          _selection={{
            background: "transparent",
            color: "transparent",
          }}
        />
      </Box>
    </Box>
  );
};

export default InteractiveTextarea;

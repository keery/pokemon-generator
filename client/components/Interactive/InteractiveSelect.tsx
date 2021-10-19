import React, { useRef } from "react";
import { Box, Select } from "@chakra-ui/react";
import { Select as SelectType } from "~@types/Card";
import { Control, useController, useWatch } from "react-hook-form";

interface Props {
  name: string;
  x: number;
  y: number;
  height: number;
  width: number;
  control: Control;
  className?: string;
  icon: JSX.Element;
  choices: SelectType<any>[];
}

const InteractiveSelect = ({
  name,
  x,
  y,
  height,
  width,
  choices,
  className = "",
  control,
  icon,
}: Props) => {
  const { field } = useController({ control, name });
  const value = useWatch({ control, name });
  const inputRef = useRef(null);

  return (
    <Box role="group">
      <Box>{icon}</Box>
      <Box
        pos="absolute"
        overflow="hidden"
        left={`${x}%`}
        top={`${y}%`}
        height={`${height}%`}
        width={`${width}%`}
        className={`InteractiveSelect ${className}`}
        borderRadius="sm"
        transition="border-color ease-in-out 200ms, box-shadow 200ms ease-in-out"
        _groupHover={{
          border: "2px solid #fff",
          shadow: "md",
        }}
      >
        <Select
          ref={inputRef}
          variant="unstyled"
          name={name}
          onChange={(event) => {
            field.onChange({
              value: event.target.selectedOptions[0].value,
              label: event.target.selectedOptions[0].text,
            });
          }}
          value={value?.value}
          color="transparent"
          h="100%"
          backgroundColor="transparent"
          textAlign="justify"
          fontFamily="pokehp"
          fontSize="18px"
        >
          {choices.map(({ label, value }) => (
            <option key={`is-${value}`} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </Box>
    </Box>
  );
};

export default InteractiveSelect;

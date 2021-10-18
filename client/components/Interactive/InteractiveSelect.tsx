import React from "react";
import PropTypes from "prop-types";
import { Box, Select } from "@chakra-ui/react";
import { Control, useController, useWatch } from "react-hook-form";

interface Props {
  name: string;
  x: number;
  y: number;
  height: number;
  width: number;
  control: Control;
  className?: string;
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
}) => {
  const { field } = useController({ control, name });
  const value = useWatch({ control, name });

  return (
    <Box
      pos="absolute"
      overflow="hidden"
      left={`${x}%`}
      top={`${y}%`}
      height={`${height}%`}
      width={`${width}%`}
      className={`InteractiveSelect ${className}`}
      borderRadius="sm"
      _hover={{
        border: "2px solid #fff",
        shadow: "md",
      }}
    >
      <Select
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
  );
};

export default InteractiveSelect;

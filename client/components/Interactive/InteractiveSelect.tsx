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
        position="absolute"
        color="transparent"
        w="125%"
        h="100%"
        right="-25%"
        backgroundColor="transparent"
        textAlign="justify"
        fontFamily="pokehp"
        fontSize="18px"
        border="2px dashed transparent"
        _hover={{
          border: "2px dashed",
          borderColor: "yellow.600",
        }}
        _focus={{
          border: "2px solid",
          borderColor: "yellow.600",
        }}
      >
        {choices.map(({ label, value }) => (
          <option key={`is-${value}`} value={value}>
            {label}
          </option>
        ))}
      </Select>
      <Box h="100%" w="100%" border="2px dashed transparent" />
    </Box>
  );
};

export default InteractiveSelect;

import { FormLabel, FormControl, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const Field = ({ label, children, isDisabled = false, id = "" }) => {
  const fontWeight = useColorModeValue("600", "400");
  const textTransform = useColorModeValue("uppercase", "inherit");

  return (
    <FormControl py={2} layerStyle={isDisabled ? "disabled" : "none"}>
      <FormLabel
        fontWeight={fontWeight}
        textTransform={textTransform}
        fontSize="13px"
        id={id}
      >
        {label}
      </FormLabel>
      {children}
    </FormControl>
  );
};

export default Field;

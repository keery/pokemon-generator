import { FormLabel, FormControl } from "@chakra-ui/react";
import React from "react";

const Field = ({ label, children, isDisabled = false, id = "" }) => {
  return (
    <FormControl py={2} layerStyle={isDisabled ? "disabled" : "none"}>
      <FormLabel
        fontWeight="600"
        textTransform="uppercase"
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

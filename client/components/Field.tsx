import { FormLabel, FormControl } from "@chakra-ui/react";
import React from "react";

const Field = ({ label, children, isDisabled = false }) => (
  <FormControl py={2} layerStyle={isDisabled ? "disabled" : ""}>
    <FormLabel fontWeight="600" textTransform="uppercase" fontSize="13px">
      {label}
    </FormLabel>
    {children}
  </FormControl>
);

export default Field;

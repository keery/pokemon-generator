import { FormLabel, FormControl } from "@chakra-ui/react";
import React from "react";

const Field = ({ label, children }) => (
  <FormControl py={2}>
    <FormLabel fontWeight="600" textTransform="uppercase" fontSize="13px">
      {label}
    </FormLabel>
    {children}
  </FormControl>
);

export default Field;

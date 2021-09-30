import { FormLabel, FormControl, Divider } from "@chakra-ui/react";
import React from "react";

const Field = ({ label, children }) => (
  <FormControl py={1}>
    <FormLabel fontWeight="600" textTransform="uppercase" fontSize="13px">
      {label}
    </FormLabel>
    {children}
    <Divider mt={4} />
  </FormControl>
);

export default Field;

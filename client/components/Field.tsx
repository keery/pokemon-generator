import {
  FormLabel,
  FormControl,
  useColorModeValue,
  FormControlProps,
  FormLabelProps,
} from "@chakra-ui/react";
import React from "react";

interface Props extends FormControlProps {
  label: string;
  children: React.ReactNode;
  isDisabled?: boolean;
  id?: string;
  labelProps?: FormLabelProps;
}

const Field = ({
  label,
  children,
  isDisabled = false,
  id = "",
  labelProps = {},
  ...rest
}: Props) => {
  const fontWeight = useColorModeValue("600", "400");
  const textTransform = useColorModeValue("uppercase", "inherit");

  return (
    <FormControl py={2} layerStyle={isDisabled ? "disabled" : "none"} {...rest}>
      <FormLabel
        fontWeight={fontWeight}
        textTransform={textTransform}
        fontSize="13px"
        id={id}
        {...labelProps}
      >
        {label}
      </FormLabel>
      {children}
    </FormControl>
  );
};

export default Field;

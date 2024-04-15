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
  noLabel?: boolean;
  id?: string;
  labelProps?: FormLabelProps;
}

const Field = ({
  label,
  children,
  isDisabled = false,
  noLabel = false,
  id = "",
  labelProps = {},
  ...rest
}: Props) => {
  const fontWeight = useColorModeValue("600", "400");
  const textTransform = useColorModeValue("uppercase", "inherit");

  return (
    <FormControl py={2} layerStyle={isDisabled ? "disabled" : "none"} {...rest}>
      <FormLabel
        as={noLabel ? "div" : "label"}
        fontWeight={fontWeight}
        textTransform={textTransform}
        fontSize="13px"
        id={id !== "" ? id : null}
        {...labelProps}
      >
        {label}
      </FormLabel>
      {children}
    </FormControl>
  );
};

export default Field;

import React from "react";
import { Flex, Box, useRadio, useRadioGroup, HStack } from "@chakra-ui/react";
import { Control, useController } from "react-hook-form";
import { useTranslation } from "next-i18next";

interface Props {
  control: Control;
  name: string;
}

const Radio = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Flex as="label">
      <Box mr="20px">
        <input {...input} />
      </Box>
      <Box
        boxShadow="none"
        {...checkbox}
        cursor="pointer"
        _checked={{
          pos: "relative",
          _before: {
            content: '""',
            pos: "absolute",
            top: "0px",
            left: "-20px",
            w: "2px",
            h: "2px",
            color: "#212529",
            boxShadow:
              "2px 2px, 4px 2px, 2px 4px, 4px 4px, 6px 4px, 8px 4px, 2px 6px, 4px 6px, 6px 6px, 8px 6px, 10px 6px, 2px 8px, 4px 8px, 6px 8px, 8px 8px, 10px 8px, 12px 8px, 2px 10px, 4px 10px, 6px 10px, 8px 10px, 10px 10px, 2px 12px, 4px 12px, 6px 12px, 8px 12px, 2px 14px, 4px 14px",
          },
        }}
        _focus={{
          _before: {
            color: "#adafbc",
            boxShadow:
              "2px 2px, 4px 2px, 2px 4px, 4px 4px, 6px 4px, 8px 4px, 2px 6px, 4px 6px, 6px 6px, 8px 6px, 10px 6px, 2px 8px, 4px 8px, 6px 8px, 8px 8px, 10px 8px, 12px 8px, 2px 10px, 4px 10px, 6px 10px, 8px 10px, 10px 10px, 2px 12px, 4px 12px, 6px 12px, 8px 12px, 2px 14px, 4px 14px",
            animation: "blink 1s infinite steps(1)",
          },
        }}
        _hover={{
          _before: {
            animation: "blink 1s infinite steps(1)",
          },
        }}
      >
        {props.children}
      </Box>
    </Flex>
  );
};

const CheckboxPixel = ({ control, name }: Props) => {
  const { t } = useTranslation("common");
  const { field } = useController({ control, name });

  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    value: !field.value ? "no" : "yes",
    onChange: (value) => {
      field.onChange(value === "yes");
    },
  });

  const options = [
    { value: "yes", label: t("yes") },
    { value: "no", label: t("no") },
  ];
  const group = getRootProps();

  return (
    <HStack spacing={6} mt={3} {...group}>
      {options.map(({ value, label }) => {
        const radio = getRadioProps({ value });
        return (
          <Radio key={value} {...radio}>
            {label}
          </Radio>
        );
      })}
    </HStack>
  );
};

export default CheckboxPixel;

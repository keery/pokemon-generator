import React from "react";
import { Switch, SwitchProps, useColorModeValue } from "@chakra-ui/react";
import { Control, useController, useWatch } from "react-hook-form";
import Field from "~src/components/Field";
import CheckboxPixel from "~src/components/CheckboxPixel";

interface Props extends SwitchProps {
  control: Control;
  name: string;
  label: string;
}

const Checkbox = ({ control, name, label, ...rest }: Props) => {
  const { field } = useController({ control, name });
  const isChecked = useWatch({ control, name });
  const isNesMode = useColorModeValue(false, true);
  const flexDirection = useColorModeValue("row", "column");
  const alignItems = useColorModeValue("center", "flex-start");

  return (
    <Field
      pt={4}
      label={label}
      display="flex"
      justifyContent="space-between"
      alignItems={alignItems}
      labelProps={{ mb: 0 }}
      flexDirection={flexDirection}
    >
      {isNesMode ? (
        <CheckboxPixel control={control} name={name} />
      ) : (
        <Switch
          isChecked={isChecked}
          id={name}
          name={name}
          onChange={(e) => field.onChange(e.target.checked)}
          size="lg"
          {...rest}
        />
      )}
    </Field>
  );
};

export default Checkbox;

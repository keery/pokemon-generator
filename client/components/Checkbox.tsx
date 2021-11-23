import React from "react";
import { Switch, SwitchProps } from "@chakra-ui/react";
import { Control, useController, useWatch } from "react-hook-form";
import Field from "~components/Field";

interface Props extends SwitchProps {
  control: Control;
  name: string;
  label: string;
}

const Checkbox = ({ control, name, label, ...rest }: Props) => {
  const { field } = useController({ control, name });
  const isChecked = useWatch({ control, name });

  return (
    <Field
      pt={4}
      label={label}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      labelProps={{ mb: 0 }}
    >
      <Switch
        isChecked={isChecked}
        id={name}
        name={name}
        onChange={(e) => field.onChange(e.target.checked)}
        size="lg"
        {...rest}
      />
    </Field>
  );
};

export default Checkbox;

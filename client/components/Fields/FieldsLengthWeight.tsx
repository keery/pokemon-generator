import React from "react";
import { InputRightAddon, InputGroup } from "@chakra-ui/react";
import Field from "~components/Field";
import Input from "~components/Input";
import { useTranslation } from "next-i18next";
import { Control } from "react-hook-form";

interface Props {
  control: Control;
}

const FieldsLengthWeight = ({ control }: Props) => {
  const { t } = useTranslation("generator");

  return (
    <>
      <Field label={t("species")} id="field-species-label">
        <Input name="species" control={control} id="field-species" />
      </Field>
      <Field label={t("length")}>
        <Input name="length" control={control} />
      </Field>
      <Field label={t("weight")}>
        <InputGroup>
          <Input name="weight" control={control} borderRightRadius="none" />
          <InputRightAddon
            children="lbs"
            color="main"
            borderRightRadius="sm"
            bg="rgb(255 255 255 / 30%)"
            fontWeight="500"
            border="1px solid"
            borderColor="#cacaca"
          />
        </InputGroup>
      </Field>
    </>
  );
};

export default FieldsLengthWeight;
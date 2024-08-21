import React from "react";
import { InputRightAddon, InputGroup } from "@chakra-ui/react";
import Field from "~components/Field";
import Input from "~components/Input";
import { useTranslations } from "next-intl";

interface Props {
  isModal?: boolean;
}

const FieldsLengthWeight = ({ isModal = false }: Props) => {
  const t = useTranslations();

  return (
    <>
      <Field label={t("species")} id="field-species-label">
        <Input name="species" id="field-species" />
      </Field>
      <Field label={t("length")}>
        <Input name="length" />
      </Field>
      <Field label={t("weight")}>
        <InputGroup alignItems="center">
          <Input name="weight" borderRightRadius="none" />
          <InputRightAddon
            height="2.5rem"
            padding="0 0.6rem"
            children="lbs"
            color={isModal ? "white" : "main"}
            borderRightRadius="sm"
            bg="rgb(255 255 255 / 30%)"
            fontWeight="500"
            border="1px solid"
            borderColor="#bdccde"
          />
        </InputGroup>
      </Field>
    </>
  );
};

export default FieldsLengthWeight;

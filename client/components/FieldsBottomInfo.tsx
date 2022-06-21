import React from "react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import Select from "~components/Select";
import Textarea from "~components/Textarea";
import Input from "~components/Input";
import Field from "~components/Field";
import { RARITY_OPTIONS } from "~constants";
import FieldsCollection from "~components/Fields/FieldsCollection";

const FieldsBottomInfo = () => {
  const { t } = useTranslation("generator");
  const { control } = useFormContext();

  return (
    <>
      <Field label={t("description")}>
        <Textarea name="description" />
      </Field>
      <Field label={t("illustrator")}>
        <Input name="illustrator" />
      </Field>
      <FieldsCollection control={control} />
      <Field label={t("rarity")}>
        <Select
          name="rarity"
          options={RARITY_OPTIONS}
          iconPath="1-gen/rarity-{{value}}.png"
        />
      </Field>
    </>
  );
};

export default FieldsBottomInfo;

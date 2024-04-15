import React from "react";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import Select from "~src/components/Select";
import Textarea from "~src/components/Textarea";
import Input from "~src/components/Input";
import Field from "~src/components/Field";
import { RARITY_OPTIONS } from "~constants";
import FieldsCollection from "~src/components/Fields/FieldsCollection";

const FieldsBottomInfo = () => {
  const t = useTranslations("generator");
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
      <Field label={t("rarity")} noLabel>
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

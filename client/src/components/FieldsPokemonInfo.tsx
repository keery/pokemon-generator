import React from "react";
import Field from "~src/components/Field";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import Select from "~src/components/Select";
import Checkbox from "~src/components/Checkbox";
import FileInput from "~src/components/FileInput";
import FieldsLengthWeight from "~src/components/Fields/FieldsLengthWeight";
import Input from "~src/components/Input";
import { ELEMENTS_OPTIONS, HP_OPTIONS } from "~constants";

const FieldsPokemonInfo = () => {
  const t = useTranslations("generator");
  const { control } = useFormContext();

  return (
    <>
      <Field label={t("name")}>
        <Input name="name" autoComplete="off" />
      </Field>
      <Field label={t("type")} noLabel>
        <Select
          name="type"
          options={ELEMENTS_OPTIONS}
          iconPath="1-gen/{{value}}.png"
        />
      </Field>
      <Field label={t("picture")} noLabel>
        <FileInput name="mainImage" />
      </Field>
      <Field label="HP" noLabel>
        <Select name="hp" options={HP_OPTIONS} isClearable noTranslation />
      </Field>
      <FieldsLengthWeight />
      <Checkbox
        name="firstEdition"
        control={control}
        label={t("firstEdition")}
      />
    </>
  );
};

export default FieldsPokemonInfo;

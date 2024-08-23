import React from "react";
import Field from "~components/Field";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Select from "~components/Select";
import Checkbox from "~components/Checkbox";
import FileInput from "~components/FileInput";
import FieldsLengthWeight from "~components/Fields/FieldsLengthWeight";
import Input from "~components/Input";
import { ELEMENTS_OPTIONS, HP_OPTIONS } from "~constants";

const FieldsPokemonInfo = () => {
  const { t } = useTranslation("generator");
  const { control } = useFormContext();

  return (
    <>
      <Field label={t("name")}>
        <Input name="name" />
      </Field>
      <Field label={t("type")}>
        <Select
          name="type"
          options={ELEMENTS_OPTIONS}
          iconPath="1-gen/{{value}}.png"
          isTranslated
        />
      </Field>
      <Field label={t("picture")}>
        <FileInput name="mainImage" />
      </Field>
      <Field label={t("hp")}>
        <Select name="hp" options={HP_OPTIONS} isClearable isTranslated />
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

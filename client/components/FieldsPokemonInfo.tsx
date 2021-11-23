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
        <Input name="name" control={control} />
      </Field>
      <Field label={t("type")}>
        <Select
          name="type"
          options={ELEMENTS_OPTIONS}
          control={control}
          iconPath="{{value}}.png"
        />
      </Field>
      <Field label={t("picture")}>
        <FileInput name="mainImage" />
      </Field>
      <Field label="HP">
        <Select name="hp" options={HP_OPTIONS} control={control} isClearable />
      </Field>
      <FieldsLengthWeight control={control} />
      <Checkbox
        name="firstEdition"
        control={control}
        label={t("firstEdition")}
      />
    </>
  );
};

export default FieldsPokemonInfo;

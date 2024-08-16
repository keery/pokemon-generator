import React from "react";
import Field from "~components/Field";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import Select from "~components/Select";
import Checkbox from "~components/Checkbox";
import FileInput from "~components/FileInput";
import FieldsLengthWeight from "~components/Fields/FieldsLengthWeight";
import Input from "~components/Input";
import { ELEMENTS_OPTIONS, HP_OPTIONS } from "~constants";

const FieldsPokemonInfo = () => {
  const t = useTranslations();
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
        />
      </Field>
      <Field label={t("picture")}>
        <FileInput name="mainImage" />
      </Field>
      <Field label="HP">
        <Select
          name="hp"
          options={HP_OPTIONS}
          isClearable
          isTranslated={false}
        />
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

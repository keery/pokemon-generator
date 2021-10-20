import React from "react";
import { InputRightAddon, InputGroup } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Select from "~components/Select";
import FileInput from "~components/FileInput";
import Field from "~components/Field";
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
        <FileInput name="mainImage" control={control} />
      </Field>
      <Field label="HP">
        <Select name="hp" options={HP_OPTIONS} control={control} isClearable />
      </Field>
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

export default FieldsPokemonInfo;

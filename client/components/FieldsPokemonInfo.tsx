import React from "react";
import { Input, InputRightAddon, InputGroup } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Select from "~components/Select";
import FileInput from "~components/FileInput";
import Field from "~components/Field";
import { ELEMENTS, HP_CHOICES } from "~constants";

const optionsType = ELEMENTS.map((el) => ({
  value: el,
  label: el,
}));

const optionsHP = HP_CHOICES.map((el) => ({
  value: el,
  label: `${el} HP`,
}));

const FieldsPokemonInfo = () => {
  const { t } = useTranslation("generator");
  const { register, control } = useFormContext();

  return (
    <>
      <Field label={t("name")}>
        <Input name="name" type="text" ref={register} />
      </Field>
      <Field label={t("type")}>
        <Select
          name="type"
          options={optionsType}
          control={control}
          iconPath="1-{{value}}.png"
        />
      </Field>
      <Field label={t("picture")}>
        <FileInput name="mainImage" control={control} />
      </Field>
      <Field label="HP">
        <Select name="hp" options={optionsHP} control={control} />
      </Field>
      <Field label={t("species")}>
        <Input name="species" type="text" ref={register} />
      </Field>
      <Field label={t("length")}>
        <Input
          name="length"
          type="text"
          // placeholder={"0' 0\""}
          ref={register}
        />
      </Field>
      <Field label={t("weight")}>
        <InputGroup>
          <Input name="weight" type="text" ref={register} />
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

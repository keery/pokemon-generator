import React from "react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { DAMAGE_CHOICES, ATTACK_AMOUNT_CHOICES, ELEMENTS } from "~constants";
import Select from "~components/Select";
import Field from "~components/Field";
import Input from "~components/Input";
import Textarea from "~components/Textarea";

const optionsDamage = DAMAGE_CHOICES.map((el) => ({
  value: el,
  label: el,
}));

const optionsType = ELEMENTS.map((el) => ({
  value: el,
  label: el,
}));

const optionsAmount = ATTACK_AMOUNT_CHOICES.map((el) => ({
  value: el,
  label: el,
}));

const FieldsAttack = ({ name }) => {
  const { t } = useTranslation("generator");
  const { control } = useFormContext();

  return (
    <>
      <Field label={t("name")}>
        <Input name={`${name}Name`} id={`field-${name}`} />
      </Field>
      <Field label={t("damage")}>
        <Select
          name={`${name}Damage`}
          options={optionsDamage}
          control={control}
          isClearable
        />
      </Field>
      <Field label={t("info")}>
        <Textarea name={`${name}Info`} control={control} />
      </Field>
      <Field label={t("amount")}>
        <Select
          name={`${name}Amount`}
          options={optionsAmount}
          control={control}
        />
      </Field>
      <Field label={t("type")}>
        <Select
          name={`${name}Type`}
          isClearable
          options={optionsType}
          iconPath="1-gen/{{value}}.png"
          control={control}
        />
      </Field>
    </>
  );
};

export default FieldsAttack;

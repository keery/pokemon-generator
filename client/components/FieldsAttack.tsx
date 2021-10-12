import React from "react";
import { Input, Textarea } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { DAMAGE_CHOICES, ATTACK_AMOUNT_CHOICES, ELEMENTS } from "~constants";
import Select from "~components/Select";
import Field from "~components/Field";

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
  const { register, control } = useFormContext();

  return (
    <>
      <Field label={t("name")}>
        <Input name={`${name}.name`} type="text" ref={register} />
      </Field>
      <Field label={t("damage")}>
        <Select
          name={`${name}.damage`}
          options={optionsDamage}
          control={control}
          isClearable
        />
      </Field>
      <Field label={t("info")}>
        <Textarea name={`${name}.info`} ref={register} />
      </Field>
      <Field label={t("amount")}>
        <Select
          name={`${name}.amount`}
          options={optionsAmount}
          control={control}
        />
      </Field>
      <Field label={t("type")}>
        <Select
          name={`${name}.type`}
          isClearable
          options={optionsType}
          iconPath="{{value}}.png"
          control={control}
        />
      </Field>
    </>
  );
};

export default FieldsAttack;

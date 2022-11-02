import React from "react";
import { useTranslation } from "react-i18next";
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

const FieldsAttack = ({ name, hasColorInverted = false }) => {
  const { t } = useTranslation("generator");

  return (
    <>
      <Field label={t("name")}>
        <Input name={`${name}Name`} id={`field-${name}`} />
      </Field>
      <Field label={t("damage")}>
        <Select
          name={`${name}Damage`}
          options={optionsDamage}
          isClearable
          hasColorInverted={hasColorInverted}
        />
      </Field>
      <Field label={t("info")}>
        <Textarea name={`${name}Info`} />
      </Field>
      <Field label={t("amount")}>
        <Select
          name={`${name}Amount`}
          options={optionsAmount}
          hasColorInverted={hasColorInverted}
        />
      </Field>
      <Field label={t("type")}>
        <Select
          name={`${name}Type`}
          isClearable
          options={optionsType}
          iconPath="1-gen/{{value}}.png"
          hasColorInverted={hasColorInverted}
        />
      </Field>
    </>
  );
};

export default FieldsAttack;

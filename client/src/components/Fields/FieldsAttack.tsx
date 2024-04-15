import React from "react";
import { useTranslations } from "next-intl";
import { DAMAGE_CHOICES, ATTACK_AMOUNT_CHOICES, ELEMENTS } from "~constants";
import Select from "~src/components/Select";
import Field from "~src/components/Field";
import Input from "~src/components/Input";
import Textarea from "~src/components/Textarea";

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
  const t = useTranslations("generator");

  return (
    <>
      <Field label={t("name")}>
        <Input name={`${name}Name`} id={`field-${name}`} />
      </Field>
      <Field label={t("damage")} noLabel>
        <Select
          name={`${name}Damage`}
          options={optionsDamage}
          isClearable
          hasColorInverted={hasColorInverted}
          noTranslation
        />
      </Field>
      <Field label={t("info")}>
        <Textarea name={`${name}Info`} />
      </Field>
      <Field label={t("amount")} noLabel>
        <Select
          name={`${name}Amount`}
          options={optionsAmount}
          hasColorInverted={hasColorInverted}
          noTranslation
        />
      </Field>
      <Field label={t("type")} noLabel>
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

import React from "react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import Select from "~components/Select";
import Field from "~components/Field";
import {
  ELEMENTS,
  WEAKNESS_CHOICES,
  RESISTANCE_CHOICES,
  RETREAT_CHOICES,
} from "~constants";

const optionsType = ELEMENTS.map((el) => ({
  value: el,
  label: el,
}));

const optionsWeakness = WEAKNESS_CHOICES.map((el) => ({
  value: el,
  label: el,
}));

const optionsResistance = RESISTANCE_CHOICES.map((el) => ({
  value: el,
  label: el,
}));

const optionsRetreat = RETREAT_CHOICES.map((el) => ({
  value: el,
  label: el,
}));

const FieldsSubInfo = () => {
  const { t } = useTranslation("generator");
  const { control } = useFormContext();

  return (
    <>
      <Field label={t("weaknessType")}>
        <Select
          name="weaknessType"
          control={control}
          options={optionsType}
          isClearable
          iconPath="1-{{value}}.png"
        />
      </Field>
      <Field label={t("weaknessAmount")}>
        <Select
          name="weaknessAmount"
          control={control}
          options={optionsWeakness}
          isClearable
        />
      </Field>
      <Field label={t("resistanceType")}>
        <Select
          name="resistanceType"
          control={control}
          options={optionsType}
          iconPath="1-{{value}}.png"
          isClearable
        />
      </Field>
      <Field label={t("resistanceAmount")}>
        <Select
          name="resistanceAmount"
          control={control}
          options={optionsResistance}
          isClearable
        />
      </Field>
      <Field label={t("retreat")}>
        <Select
          name="retreat"
          control={control}
          options={optionsRetreat}
          isClearable
          iconPath="1-normal.png"
        />
      </Field>
    </>
  );
};

export default FieldsSubInfo;

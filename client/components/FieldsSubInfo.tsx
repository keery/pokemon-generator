import React from "react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import Select from "~components/Select";
import Field from "~components/Field";
import {
  ELEMENTS,
  WEAKNESS_OPTIONS,
  RESISTANCE_OPTIONS,
  RETREAT_OPTIONS,
  ELEMENTS_OPTIONS,
} from "~constants";

const FieldsSubInfo = () => {
  const { t } = useTranslation("generator");
  const { control } = useFormContext();

  return (
    <>
      <Field label={t("weaknessType")}>
        <Select
          name="weaknessType"
          control={control}
          options={ELEMENTS_OPTIONS}
          isClearable
          iconPath="{{value}}.png"
        />
      </Field>
      <Field label={t("weaknessAmount")}>
        <Select
          name="weaknessAmount"
          control={control}
          options={WEAKNESS_OPTIONS}
          isClearable
        />
      </Field>
      <Field label={t("resistanceType")}>
        <Select
          name="resistanceType"
          control={control}
          options={ELEMENTS_OPTIONS}
          iconPath="{{value}}.png"
          isClearable
        />
      </Field>
      <Field label={t("resistanceAmount")}>
        <Select
          name="resistanceAmount"
          control={control}
          options={RESISTANCE_OPTIONS}
          isClearable
        />
      </Field>
      <Field label={t("retreat")}>
        <Select
          name="retreat"
          control={control}
          options={RETREAT_OPTIONS}
          isClearable
          iconPath="normal.png"
        />
      </Field>
    </>
  );
};

export default FieldsSubInfo;

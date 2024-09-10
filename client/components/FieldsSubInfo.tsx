import React from "react";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import Select from "~components/Select";
import Field from "~components/Field";
import {
  WEAKNESS_OPTIONS,
  RESISTANCE_OPTIONS,
  RETREAT_OPTIONS,
  ELEMENTS_OPTIONS,
} from "~constants";

const FieldsSubInfo = () => {
  const t = useTranslations();
  const { control } = useFormContext();

  return (
    <>
      <Field label={t("weaknessType")}>
        <Select
          name="weaknessType"
          options={ELEMENTS_OPTIONS}
          isClearable
          iconPath="1-gen/{{value}}.png"
          isTranslated
        />
      </Field>
      <Field label={t("weaknessAmount")}>
        <Select
          name="weaknessAmount"
          options={WEAKNESS_OPTIONS}
          isClearable
          isTranslated={false}
        />
      </Field>
      <Field label={t("resistanceType")}>
        <Select
          name="resistanceType"
          options={ELEMENTS_OPTIONS}
          iconPath="1-gen/{{value}}.png"
          isClearable
          isTranslated
        />
      </Field>
      <Field label={t("resistanceAmount")}>
        <Select
          name="resistanceAmount"
          options={RESISTANCE_OPTIONS}
          isClearable
          isTranslated={false}
        />
      </Field>
      <Field label={t("retreat")}>
        <Select
          name="retreat"
          options={RETREAT_OPTIONS}
          isClearable
          iconPath="1-gen/normal.png"
          isTranslated={false}
        />
      </Field>
    </>
  );
};

export default FieldsSubInfo;

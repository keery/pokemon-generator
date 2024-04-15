import React from "react";
import { useTranslations } from "next-intl";
import Select from "~src/components/Select";
import Field from "~src/components/Field";
import {
  WEAKNESS_OPTIONS,
  RESISTANCE_OPTIONS,
  RETREAT_OPTIONS,
  ELEMENTS_OPTIONS,
} from "~constants";

const FieldsSubInfo = () => {
  const t = useTranslations("generator");

  return (
    <>
      <Field label={t("weaknessType")} noLabel>
        <Select
          name="weaknessType"
          options={ELEMENTS_OPTIONS}
          isClearable
          iconPath="1-gen/{{value}}.png"
        />
      </Field>
      <Field label={t("weaknessAmount")} noLabel>
        <Select
          name="weaknessAmount"
          options={WEAKNESS_OPTIONS}
          isClearable
          noTranslation
        />
      </Field>
      <Field label={t("resistanceType")} noLabel>
        <Select
          name="resistanceType"
          options={ELEMENTS_OPTIONS}
          iconPath="1-gen/{{value}}.png"
          isClearable
        />
      </Field>
      <Field label={t("resistanceAmount")} noLabel>
        <Select
          name="resistanceAmount"
          options={RESISTANCE_OPTIONS}
          isClearable
          noTranslation
        />
      </Field>
      <Field label={t("retreat")} noLabel>
        <Select
          name="retreat"
          options={RETREAT_OPTIONS}
          isClearable
          iconPath="1-gen/normal.png"
          noTranslation
        />
      </Field>
    </>
  );
};

export default FieldsSubInfo;

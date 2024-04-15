import React from "react";
import { useTranslations } from "next-intl";
import { useFormContext, useWatch } from "react-hook-form";
import FileInput from "~src/components/FileInput";
import Select from "~src/components/Select";
import Input from "~src/components/Input";
import { BASIC, STAGE_OPTIONS } from "~constants";
import dynamic from "next/dynamic";

const Field = dynamic(() => import("~src/components/Field"), { ssr: false });

const FieldsEvolution = () => {
  const t = useTranslations("generator");
  const { control } = useFormContext();
  const stage = useWatch({
    control,
    name: "stage",
  });

  return (
    <>
      <Field label={t("stage")} noLabel>
        <Select name="stage" options={STAGE_OPTIONS} noTranslation />
      </Field>
      <Field label={t("name")} isDisabled={stage.value === BASIC}>
        <Input name="nameEvolution" type="text" />
      </Field>
      <Field label={t("picture")} isDisabled={stage.value === BASIC} noLabel>
        <FileInput name="evolvePicture" />
      </Field>
    </>
  );
};

export default FieldsEvolution;

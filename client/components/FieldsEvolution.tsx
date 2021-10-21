import React from "react";
import { Input } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useFormContext, useWatch } from "react-hook-form";
import FileInput from "~components/FileInput";
import Select from "~components/Select";
import { BASIC, STAGE_OPTIONS } from "~constants";
import dynamic from "next/dynamic";

const Field = dynamic(() => import("~components/Field"), { ssr: false });

const FieldsEvolution = () => {
  const { t } = useTranslation("generator");
  const { register, control } = useFormContext();
  const stage = useWatch({
    control,
    name: "stage",
  });

  return (
    <>
      <Field label={t("stage")}>
        <Select name="stage" options={STAGE_OPTIONS} control={control} />
      </Field>
      <Field label={t("name")} isDisabled={stage.value === BASIC}>
        <Input
          name="nameEvolution"
          type="text"
          {...register(`nameEvolution`)}
        />
      </Field>
      <Field label={t("picture")} isDisabled={stage.value === BASIC}>
        <FileInput name="evolvePicture" id="evolvePicture" />
      </Field>
    </>
  );
};

export default FieldsEvolution;

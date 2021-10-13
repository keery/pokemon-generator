import React from "react";
import { Input } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import Field from "~components/Field";
import FileInput from "~components/FileInput";
import Select from "~components/Select";
import { BASIC, STAGE_ONE, STAGE_TWO } from "~constants";

const optionsStage = [
  { value: BASIC, label: "Basic" },
  { value: STAGE_ONE, label: "Stage 1" },
  { value: STAGE_TWO, label: "Stage 2" },
];

const FieldsEvolution = () => {
  const { t } = useTranslation("generator");
  const { register, control } = useFormContext();

  return (
    <>
      <Field label={t("stage")}>
        <Select name="stage" options={optionsStage} control={control} />
      </Field>
      <Field label={t("name")}>
        <Input
          name="nameEvolution"
          type="text"
          {...register(`nameEvolution`)}
        />
      </Field>
      <Field label={t("picture")}>
        <FileInput name="evolvePicture" control={control} />
      </Field>
    </>
  );
};

export default FieldsEvolution;

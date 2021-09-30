import React from "react";
import { Input } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import Field from "~components/Field";
import FileInput from "~components/FileInput";
import Select from "~components/Select";

const optionsStage = [
  { value: "basic", label: "Basic" },
  { value: "stage1", label: "Stage 1" },
  { value: "stage2", label: "Stage 2" },
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
        <Input name="nameEvolution" type="text" ref={register} />
      </Field>
      <Field label={t("picture")}>
        <FileInput name="evolvePicture" ref={register} />
      </Field>
    </>
  );
};

export default FieldsEvolution;

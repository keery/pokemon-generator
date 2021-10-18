import React from "react";
import { Input } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useFormContext, useWatch } from "react-hook-form";
import Field from "~components/Field";
import FileInput from "~components/FileInput";
import Select from "~components/Select";
import { BASIC, STAGE_OPTIONS } from "~constants";

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
        <FileInput name="evolvePicture" control={control} />
      </Field>
    </>
  );
};

export default FieldsEvolution;

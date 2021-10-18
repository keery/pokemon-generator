import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import Select from "~components/Select";
import Input from "~components/Input";
import Textarea from "~components/Textarea";
import Field from "~components/Field";
import { RARITY_OPTIONS } from "~constants";

const FieldsBottomInfo = () => {
  const { t } = useTranslation("generator");
  const { control } = useFormContext();

  return (
    <>
      <Field label={t("description")}>
        <Textarea name="description" control={control} />
      </Field>
      <Field label={t("illustrator")}>
        <Input name="illustrator" control={control} />
      </Field>
      <Field label={t("collectionNumber")} id="field-collection-label">
        <Flex alignItems="center">
          <Input
            name="cardNumber"
            control={control}
            maxLength={3}
            id="field-collection"
          />
          <Box mx={3} fontWeight="600">
            /
          </Box>
          <Input name="totalCollection" control={control} maxLength={3} />
        </Flex>
      </Field>
      <Field label={t("rarity")}>
        <Select
          name="rarity"
          control={control}
          options={RARITY_OPTIONS}
          iconPath="rarity-{{value}}.png"
        />
      </Field>
    </>
  );
};

export default FieldsBottomInfo;

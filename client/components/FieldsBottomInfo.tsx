import React from "react";
import { Box, Input, Textarea, Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import Select from "~components/Select";
import Field from "~components/Field";
import { RARITY_CHOICES } from "~constants";

const optionsRarity = RARITY_CHOICES.map((el) => ({
  value: el,
  label: el,
}));

const FieldsBottomInfo = () => {
  const { t } = useTranslation("generator");
  const { register, control } = useFormContext();

  return (
    <>
      <Field label={t("description")}>
        <Textarea name="description" {...register(`description`)} />
      </Field>
      <Field label={t("illustrator")}>
        <Input name="illustrator" type="text" {...register(`illustrator`)} />
      </Field>
      <Field label={t("collectionNumber")}>
        <Flex alignItems="center">
          <Input
            name="cardNumber"
            type="text"
            {...register(`cardNumber`)}
            maxLength={3}
          />
          <Box mx={3} fontWeight="600">
            /
          </Box>
          <Input
            name="totalCollection"
            type="text"
            {...register(`totalCollection`)}
            maxLength={3}
          />
        </Flex>
      </Field>
      <Field label={t("rarity")}>
        <Select
          name="rarity"
          control={control}
          options={optionsRarity}
          iconPath="rarity-{{value}}.png"
        />
      </Field>
    </>
  );
};

export default FieldsBottomInfo;

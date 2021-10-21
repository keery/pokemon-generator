import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import Field from "~components/Field";
import Input from "~components/Input";
import { useTranslation } from "next-i18next";
import { Control } from "react-hook-form";

interface Props {
  control: Control;
}

const FieldsCollection = ({ control }: Props) => {
  const { t } = useTranslation("generator");

  return (
    <>
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
    </>
  );
};

export default FieldsCollection;

import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import Field from "~src/components/Field";
import Input from "~src/components/Input";
import { useTranslations } from "next-intl";
import { Control } from "react-hook-form";

interface Props {
  control: Control;
}

const FieldsCollection = ({ control }: Props) => {
  const t = useTranslations("generator");

  return (
    <>
      <Field label={t("collectionNumber")} id="field-collection-label">
        <Flex alignItems="center">
          <Input name="cardNumber" maxLength={3} id="field-collection" />
          <Box mx={3} fontWeight="600">
            /
          </Box>
          <Input name="totalCollection" maxLength={3} />
        </Flex>
      </Field>
    </>
  );
};

export default FieldsCollection;

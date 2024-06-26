import React from "react";
import {
  InputRightAddon,
  InputGroup,
  useColorModeValue,
} from "@chakra-ui/react";
import Field from "~components/Field";
import Input from "~components/Input";
import { useTranslation } from "next-i18next";

interface Props {
  isModal?: boolean;
}

const FieldsLengthWeight = ({ isModal = false }: Props) => {
  const { t } = useTranslation("generator");
  const inputGroupStyle = useColorModeValue(
    {},
    {
      layerStyle: "nes-input",
      p: 0,
      _after: {
        content: '""',
        position: "absolute",
        left: "-4px",
        right: "-4px",
        top: "-4px",
        bottom: "-4px",
        bgColor: "white",
        zIndex: -1,
      },
    }
  );
  const inputStyle = useColorModeValue(
    {},
    { border: "none", fontSize: "xs", _focus: {} }
  );
  const addonStyle = useColorModeValue(
    {},
    {
      border: "none",
      borderRightRadius: "none",
      px: 2,
      py: 2,
      color: "white",
      mr: "4px",
      fontSize: "xs",
      height: "100%",
      bgColor: "new.1",
    }
  );

  return (
    <>
      <Field label={t("species")} id="field-species-label">
        <Input name="species" id="field-species" />
      </Field>
      <Field label={t("length")}>
        <Input name="length" />
      </Field>
      <Field label={t("weight")}>
        <InputGroup {...inputGroupStyle} alignItems="center">
          <Input name="weight" borderRightRadius="none" {...inputStyle} />
          <InputRightAddon
            height="2.5rem"
            padding="0 0.6rem"
            children="lbs"
            color={isModal ? "white" : "main"}
            borderRightRadius="sm"
            bg="rgb(255 255 255 / 30%)"
            fontWeight="500"
            border="1px solid"
            borderColor="#bdccde"
            {...addonStyle}
          />
        </InputGroup>
      </Field>
    </>
  );
};

export default FieldsLengthWeight;

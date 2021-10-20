import React from "react";
import Form from "public/assets/img/form.svg";
import { useTranslation } from "next-i18next";
import OptionButton from "~components/PanelOptions/OptionButton";
import { useBreakpointValue } from "@chakra-ui/react";

const FormButton = () => {
  const { t } = useTranslation("generator");
  const isVisible = useBreakpointValue({ base: true, xl: false });
  if (!isVisible) return null;

  return (
    <>
      <OptionButton
        icon={<Form />}
        onClick={() => null}
        label={t("openForm")}
        keyboard_shortcut={["ctrl", "f"]}
      />
    </>
  );
};

export default FormButton;

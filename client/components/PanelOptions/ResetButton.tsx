import React, { useMemo, useState, useCallback, memo } from "react";
import Reset from "public/assets/img/reset.svg";
import { useColorMode, Image } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useWatch, useFormContext } from "react-hook-form";
import ConfirmReset from "~components/ConfirmReset";
import OptionButton from "~components/PanelOptions/OptionButton";
import isEqual from "lodash.isequal";
import { CARD_DEFAULT_STATE } from "~data/card";
import useResetCard from "~hooks/useResetCard";

const ResetButton = () => {
  const { t } = useTranslation("generator");
  const [isOpen, setOpen] = useState(false);
  const { control } = useFormContext();
  const formValues = useWatch({
    control,
  });
  const [isDisabled, setDisabled] = useState(
    isEqual(formValues, CARD_DEFAULT_STATE)
  );

  const { colorMode } = useColorMode();
  const resetCard = useResetCard(() => setOpen(false));

  useMemo(() => {
    const isNotDefault = isEqual(formValues, CARD_DEFAULT_STATE);
    if (isDisabled !== isNotDefault) {
      setDisabled(isNotDefault);
    }
  }, [formValues]);

  return (
    <>
      <OptionButton
        isDisabled={isDisabled}
        icon={
          colorMode === "dark" ? (
            <Image src="/assets/img/pixel/reset.png" boxSize="24px" />
          ) : (
            <Reset />
          )
        }
        onClick={() => setOpen(true)}
        label={t("resetCard")}
        keyboard_shortcut={["ctrl", "r"]}
      />
      <ConfirmReset isOpen={isOpen} setOpen={setOpen} confirm={resetCard} />
    </>
  );
};

export default memo(ResetButton);

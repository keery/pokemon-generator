import React, { useMemo, useState, useCallback } from "react";
import Reset from "public/assets/img/reset.svg";
import { useTranslation } from "next-i18next";
import { useWatch, useFormContext } from "react-hook-form";
import ConfirmReset from "~components/ConfirmReset";
import OptionButton from "~components/PanelOptions/OptionButton";
import isEqual from "lodash.isequal";
import { CARD_DEFAULT_STATE } from "~data/card";

const ResetButton = () => {
  const { t } = useTranslation("generator");
  const [isOpen, setOpen] = useState(false);
  const { control, reset } = useFormContext();
  const formValues = useWatch({
    control,
  });
  const [isDisabled, setDisabled] = useState(
    isEqual(formValues, CARD_DEFAULT_STATE)
  );

  const confirmReset = useCallback(() => {
    setOpen(false);
    reset(CARD_DEFAULT_STATE);
    localStorage.removeItem(process.env.NEXT_PUBLIC_KEY_CACHE);
  }, []);

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
        icon={<Reset />}
        onClick={() => setOpen(true)}
        label={t("resetCard")}
      />
      <ConfirmReset isOpen={isOpen} setOpen={setOpen} confirm={confirmReset} />
    </>
  );
};

export default ResetButton;

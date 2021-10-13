import React, { useMemo, useState, useCallback } from "react";
import Reset from "public/assets/img/reset.svg";
import { useTranslation } from "next-i18next";
import { useWatch, useFormContext } from "react-hook-form";
import ConfirmReset from "~components/ConfirmReset";
import OptionButton from "~components/PanelOptions/OptionButton";
import isEqual from "lodash.isequal";
import { CARD_DEFAULT_STATE } from "~data/card";
import { cardAtom } from "~atoms/card";
import { useRecoilState } from "recoil";

const FLIPPING_TIME = 1000;

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
  const [card, setCardState] = useRecoilState(cardAtom);

  const confirmReset = useCallback(() => {
    setOpen(false);
    localStorage.removeItem(process.env.NEXT_PUBLIC_KEY_CACHE);
    setCardState({ ...card, isFlipped: true });

    setTimeout(() => {
      reset(CARD_DEFAULT_STATE);
    }, FLIPPING_TIME / 2);
    setTimeout(() => {
      setCardState({ ...card, isFlipped: false });
    }, FLIPPING_TIME);
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
        keyboard_shortcut={["ctrl", "r"]}
      />
      <ConfirmReset isOpen={isOpen} setOpen={setOpen} confirm={confirmReset} />
    </>
  );
};

export default ResetButton;

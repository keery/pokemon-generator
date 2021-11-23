import React, { useMemo, useState, useCallback, memo } from "react";
import Reset from "public/assets/img/reset.svg";
import { useColorMode, Image } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useWatch, useFormContext } from "react-hook-form";
import ConfirmReset from "~components/ConfirmReset";
import OptionButton from "~components/PanelOptions/OptionButton";
import isEqual from "lodash.isequal";
import { CARD_DEFAULT_STATE } from "~data/card";
import { cardAtom } from "~atoms/card";
import { historyAtom, HISTORY_DEFAULT_STATE } from "~atoms/history";
import { useSetRecoilState } from "recoil";

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
  const setCardState = useSetRecoilState(cardAtom);
  const setHistoryState = useSetRecoilState(historyAtom);
  const { colorMode } = useColorMode();

  const confirmReset = useCallback(() => {
    setOpen(false);
    localStorage.removeItem(process.env.NEXT_PUBLIC_KEY_CACHE);
    setCardState((c) => ({ ...c, isFlipped: true }));

    setTimeout(() => {
      reset(CARD_DEFAULT_STATE);
      setHistoryState(HISTORY_DEFAULT_STATE);
    }, FLIPPING_TIME / 2);
    setTimeout(() => {
      setCardState((c) => ({ ...c, isFlipped: false }));
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
      <ConfirmReset isOpen={isOpen} setOpen={setOpen} confirm={confirmReset} />
    </>
  );
};

export default memo(ResetButton);

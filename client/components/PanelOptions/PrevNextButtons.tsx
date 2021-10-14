import React from "react";
import OptionButton from "~components/PanelOptions/OptionButton";
import Prev from "public/assets/img/prev.svg";
import Next from "public/assets/img/next.svg";
import { useTranslation } from "next-i18next";
import { useRecoilState } from "recoil";
import { historyAtom } from "~atoms/history";

const PrevNextButtons = () => {
  const { t } = useTranslation("generator");
  const [historyState, setHistoryState] = useRecoilState(historyAtom);

  return (
    <>
      <OptionButton
        icon={<Prev />}
        onClick={() => {
          setHistoryState({
            ...historyState,
            historyIndex: historyState.historyIndex - 1,
            historyAction: "prev",
          });
        }}
        label={t("prev")}
        isDisabled={historyState.historyIndex <= 0}
        keyboard_shortcut={["ctrl", "z"]}
      />
      <OptionButton
        icon={<Next />}
        onClick={() => {
          setHistoryState({
            ...historyState,
            historyIndex: historyState.historyIndex + 1,
            historyAction: "next",
          });
        }}
        isDisabled={historyState.historyIndex + 1 >= historyState.historyLength}
        label={t("next")}
        keyboard_shortcut={["ctrl", "y"]}
      />
    </>
  );
};

export default PrevNextButtons;

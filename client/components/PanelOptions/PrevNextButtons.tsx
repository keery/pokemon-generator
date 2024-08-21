import React from "react";
import OptionButton from "~components/PanelOptions/OptionButton";
import Prev from "public/assets/img/prev.svg";
import Next from "public/assets/img/next.svg";
import { useTranslations } from "next-intl";
import { useRecoilState } from "recoil";
import { historyAtom } from "~atoms/history";

const PrevNextButtons = () => {
  const t = useTranslations();
  const [historyState, setHistoryState] = useRecoilState(historyAtom);

  return (
    <>
      <OptionButton
        icon={<Prev />}
        onClick={() => {
          setHistoryState((h) => ({
            ...h,
            historyIndex: h.historyIndex - 1,
            historyAction: "prev",
          }));
        }}
        label={t("prev")}
        isDisabled={historyState.historyIndex <= 0}
        keyboard_shortcut={["ctrl", "z"]}
      />
      <OptionButton
        icon={<Next />}
        onClick={() => {
          setHistoryState((h) => ({
            ...h,
            historyIndex: h.historyIndex + 1,
            historyAction: "next",
          }));
        }}
        isDisabled={historyState.historyIndex + 1 >= historyState.historyLength}
        label={t("next")}
        keyboard_shortcut={["ctrl", "y"]}
      />
    </>
  );
};

export default PrevNextButtons;

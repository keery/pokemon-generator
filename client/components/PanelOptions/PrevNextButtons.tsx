import React from "react";
import OptionButton from "~components/PanelOptions/OptionButton";
import Prev from "public/assets/img/prev.svg";
import Next from "public/assets/img/next.svg";
import { useTranslation } from "next-i18next";
import { useRecoilState } from "recoil";
import { historyAtom } from "~atoms/history";
import { Image, useColorMode } from "@chakra-ui/react";

const PrevNextButtons = () => {
  const { t } = useTranslation("generator");
  const [historyState, setHistoryState] = useRecoilState(historyAtom);
  const { colorMode } = useColorMode();

  return (
    <>
      <OptionButton
        icon={
          colorMode === "dark" ? (
            <Image src="/assets/img/pixel/arrow-left.png" boxSize="24px" />
          ) : (
            <Prev />
          )
        }
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
        icon={
          colorMode === "dark" ? (
            <Image src="/assets/img/pixel/arrow-right.png" boxSize="24px" />
          ) : (
            <Next />
          )
        }
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

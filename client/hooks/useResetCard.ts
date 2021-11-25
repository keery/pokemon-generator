import { useCallback } from "react";
import { CARD_DEFAULT_STATE } from "~data/card";
import { cardAtom } from "~atoms/card";
import { historyAtom, HISTORY_DEFAULT_STATE } from "~atoms/history";
import { useSetRecoilState } from "recoil";
import { useFormContext } from "react-hook-form";

const FLIPPING_TIME = 1000;

const useResetCard = (callback?: () => any) => {
  const { reset } = useFormContext();
  const setCardState = useSetRecoilState(cardAtom);
  const setHistoryState = useSetRecoilState(historyAtom);

  const resetCard = useCallback(() => {
    if (callback) callback();
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

  return resetCard;
};

export default useResetCard;

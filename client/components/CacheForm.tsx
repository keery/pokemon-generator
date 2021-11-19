import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useRecoilState } from "recoil";
import { historyAtom, HISTORY_DEFAULT_STATE } from "~atoms/history";
import { cacheCard } from "~utils/cache";
import isEqual from "lodash.isequal";
import debounce from "lodash.debounce";
import { updatedDiff } from "deep-object-diff";
import { CARD_DEFAULT_STATE } from "~data/card";

const CacheWrapper = () => {
  const { control } = useFormContext();
  const values = useWatch({ control });

  return <CacheForm formValues={values} />;
};

const CacheForm = ({ formValues }) => {
  const { reset } = useFormContext();
  const initialValues = useMemo(() => ({ ...formValues }), []);
  const [historyState, setHistoryState] = useRecoilState(historyAtom);
  const [history, setHistory] = useState([
    { changed: initialValues, original: initialValues },
  ]);
  const [prevState, setPrev] = useState({ ...initialValues });
  const isInit = useRef(false);

  const onChange = useCallback(
    debounce((values, history, state, prev) => {
      if (!isInit.current) {
        isInit.current = true;
        return;
      }

      if (
        isEqual(values, history[history.length - 1]) ||
        ["next", "prev"].includes(historyState.historyAction)
      )
        return;

      cacheCard(values);
      const isResetted = updatedDiff(CARD_DEFAULT_STATE, values);

      if (Object.keys(isResetted).length === 0) {
        setHistoryState(HISTORY_DEFAULT_STATE);
        setHistory([
          { changed: CARD_DEFAULT_STATE, original: CARD_DEFAULT_STATE },
        ]);
        setPrev({ ...CARD_DEFAULT_STATE });
        return;
      }

      let diff = {};

      // Case I am doing modif from middle of history
      if (
        state.historyIndex > 0 &&
        state.historyIndex + 1 !== state.historyLength
      ) {
        diff = updatedDiff(
          { ...prev, ...history[state.historyIndex + 1].original },
          values
        );
      } else {
        diff = updatedDiff(prev, values);
      }

      if (Object.keys(diff).length === 0) return;

      const historyLine = {
        changed: diff,
        original: Object.keys(diff).reduce((total, current) => {
          total[current] = prev[current];
          return total;
        }, {}),
      };

      const newHistory = [
        ...history.slice(0, state.historyIndex + 1),
        historyLine,
      ];

      setHistory(newHistory);
      setPrev({ ...values });
      setHistoryState({
        historyIndex: newHistory.length - 1,
        historyLength: newHistory.length,
        historyAction: "increment",
      });
    }, 200),
    [history, historyState, prevState]
  );

  useEffect(() => {
    onChange(formValues, history, historyState, prevState);
  }, [formValues]);

  useEffect(() => {
    if (!["next", "prev"].includes(historyState.historyAction)) return;

    const changeToApply =
      historyState.historyAction === "prev"
        ? history[historyState.historyIndex + 1].original
        : history[historyState.historyIndex].changed;

    reset({
      ...formValues,
      ...changeToApply,
    });
    setHistoryState({
      ...historyState,
      historyAction: null,
    });
  }, [historyState.historyIndex, historyState.historyLength, history]);

  return <></>;
};

export default CacheWrapper;

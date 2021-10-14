import React, { useEffect, useState, useRef, useCallback } from "react";
import { useWatch, useFormContext } from "react-hook-form";
import { useRecoilState } from "recoil";
import { historyAtom } from "~atoms/history";
import { cacheCard } from "~utils/cache";
import dynamic from "next/dynamic";
import isEqual from "lodash.isequal";
import debounce from "lodash.debounce";
import { updatedDiff } from "deep-object-diff";

const CacheForm = () => {
  const { control, reset } = useFormContext();
  const formValues = useWatch({
    control,
  });
  const [historyState, setHistoryState] = useRecoilState(historyAtom);
  const [history, setHistory] = useState([
    { changed: formValues, original: formValues },
  ]);
  const [prevState, setPrev] = useState({ ...formValues });
  const isInit = useRef(false);

  const onChange = useCallback(
    debounce((values, history, state, prev) => {
      if (!isInit.current) {
        isInit.current = true;
        return;
      }

      if (isEqual(values, history[history.length - 1])) return;

      cacheCard(values);
      const diff = updatedDiff(prev, values);

      if (Object.keys(diff).length === 0) throw new Error("No change diff");

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
      setPrev(values);
      setHistoryState({
        historyIndex: newHistory.length - 1,
        historyLength: newHistory.length,
        historyAction: "increment",
      });
    }, 200),
    []
  );

  useEffect(() => {
    onChange(formValues, history, historyState, prevState);
  }, [formValues]);

  useEffect(() => {
    if (!["next", "prev"].includes(historyState.historyAction)) return;
    isInit.current = false;

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

export default dynamic(() => Promise.resolve(CacheForm), {
  ssr: false,
});

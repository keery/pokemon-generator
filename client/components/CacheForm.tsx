import React, { useEffect, useState, useRef, useCallback } from "react";
import { cacheCard, decrypt } from "~utils/cache";
import { useWatch, useFormContext } from "react-hook-form";
import { useRecoilState } from "recoil";
import { historyAtom } from "~atoms/history";
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
  const [history, setHistory] = useState([cacheCard(formValues)]);
  const isInit = useRef(false);

  const onChange = useCallback(
    debounce((values, history, state) => {
      if (!isInit.current) {
        isInit.current = true;
        return;
      }

      if (
        isEqual(
          values,
          decrypt(
            history[history.length - 1],
            process.env.NEXT_PUBLIC_ENCRYPT_KEY
          )
        )
      )
        return;
      const encryptedValues = cacheCard(values);
      console.log(
        state.historyIndex,
        values,
        history,
        isEqual(encryptedValues, history[history.length - 1])
      );
      const newHistory = [
        ...history.slice(0, state.historyIndex + 1),
        encryptedValues,
      ];
      setHistory(newHistory);
      setHistoryState({
        historyIndex: newHistory.length - 1,
        historyLength: newHistory.length,
        historyAction: "increment",
      });
    }, 200),
    []
  );

  useEffect(() => {
    onChange(formValues, history, historyState);
  }, [formValues]);

  useEffect(() => {
    if (historyState.historyAction !== "arrow") return;
    isInit.current = false;

    reset(
      decrypt(
        history[historyState.historyIndex],
        process.env.NEXT_PUBLIC_ENCRYPT_KEY
      )
    );
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

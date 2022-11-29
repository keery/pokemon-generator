import React, { useEffect } from "react";

const useSafariBackdropFilter = (
  ref: React.RefObject<any>,
  observedValue: boolean
) => {
  useEffect(() => {
    if (observedValue && ref && typeof ref.current !== "undefined") {
      setTimeout(() => {
        ref.current.style.display = "table";
        ref.current.offsetHeight;
        ref.current.style.display = "block";
      }, 1);
    }
  }, [observedValue]);
  return null;
};

export default useSafariBackdropFilter;

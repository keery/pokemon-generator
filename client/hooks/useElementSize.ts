import { useEffect, useState, RefObject } from "react";

const useElementSize = (ref: RefObject<any>) => {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
    parentHeight: 0,
    parentWidth: 0,
  });

  useEffect(() => {
    if (ref && ref.current) {
      setSize({
        height: ref.current.clientHeight,
        width: ref.current.clientWidth,
        parentHeight: ref.current.parentElement.clientHeight,
        parentWidth: ref.current.parentElement.clientWidth,
      });
    }
  }, [ref, ref.current]);

  return size;
};

export default useElementSize;

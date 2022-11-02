import { useEffect, useState, RefObject } from "react";

export enum Mode {
  APPEND = "append",
  STICKY = "sticky",
}

const useOffsetTop = (
  ref: RefObject<any>,
  mode: Mode = Mode.APPEND,
  useParent = false
) => {
  const [top, setTop] = useState(0);

  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref && ref.current) {
      switch (mode) {
        case Mode.APPEND:
          if (useParent) {
            setTop(
              ref.current.offsetParent.offsetTop +
                ref.current.offsetParent.clientHeight -
                window.innerHeight
            );
          } else {
            setTop(
              ref.current.offsetTop +
                ref.current.clientHeight -
                window.innerHeight
            );
          }

          break;
        case Mode.STICKY:
          setTop(ref.current.offsetTop);
          break;
      }
    }
  }, [ref, ref.current, useParent, mode]);

  useEffect(() => {
    if (ref && ref.current) {
      setHeight(ref.current.clientHeight);
    }
  }, [ref, ref.current, useParent, mode, ref.current?.clientHeight]);

  return { top: top + height, height };
};

export default useOffsetTop;

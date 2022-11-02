import { useEffect, RefObject, useState } from "react";

const useIsIntersecting = (
  ref: RefObject<any>,
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (ref && ref.current) {
      const observer = new IntersectionObserver(([e]) => {
        const res = e.intersectionRatio < 1;

        if (isIntersecting !== res) {
          setIntersecting(res);
        }
      }, options);

      observer.observe(ref.current);
    }
  }, [ref, ref.current, options]);

  return isIntersecting;
};

export default useIsIntersecting;

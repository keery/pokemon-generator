import { useEffect, RefObject } from "react";

const useIntersectionObserver = (
  ref: RefObject<any>,
  callback: () => any,
  options: IntersectionObserverInit = {}
) => {
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      const res = e.intersectionRatio < 1;

      // callback();

      // if (isIntersecting !== res) {
      //   setIntersecting(res);
      // }
    }, options);

    if (ref && ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, ref.current, options]);
};

export default useIntersectionObserver;

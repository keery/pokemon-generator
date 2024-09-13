import { useEffect, RefObject } from "react";
import { useInView } from "framer-motion";

const useIsIntersecting = (ref: RefObject<any>, callback) => {
  const isInView = useInView(ref, {
    margin: `0px 0px -${window.innerHeight * 0.99}px 0px`,
  });

  useEffect(() => {
    callback(isInView);
  }, [isInView]);
};

export default useIsIntersecting;

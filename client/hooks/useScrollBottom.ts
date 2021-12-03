import React, { useEffect } from "react";
import throttle from "lodash.throttle";

const useScrollBottom = (ref, callback: () => void) => {
  const handleScroll = () => {
    if (!ref.current) return null;
    const scrollBottom =
      window.innerHeight + document.documentElement.scrollTop;
    const gridBottom = ref.current.offsetTop + ref.current.offsetHeight;

    if (scrollBottom > gridBottom) {
      callback();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", throttle(handleScroll, 200));
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
};

export default useScrollBottom;

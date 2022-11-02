import { useEffect } from "react";
import throttle from "lodash.throttle";

const useScrollBottom = (
  ref,
  callback: () => void,
  isEnabled: boolean = true
) => {
  useEffect(() => {
    const handleScroll = throttle(() => {
      if (!isEnabled || !ref.current) return null;

      const scrollBottom =
        window.innerHeight + document.documentElement.scrollTop;
      const gridBottom = ref.current.offsetTop + ref.current.offsetHeight;

      if (scrollBottom > gridBottom) {
        callback();
      }
    }, 200);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isEnabled]);
};

export default useScrollBottom;

import React from "react";

const useClickOutside = (ref, callback) => {
  const handleClick = (e) => {
    // console.log(ref.current);
    // console.log(e.target);
    // console.log(e.target.getStage());
    // console.log(ref.current);
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };
  React.useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

export default useClickOutside;

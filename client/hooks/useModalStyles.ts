import { useBreakpointValue } from "@chakra-ui/react";

const useModalStyles = () => {
  const radius = useBreakpointValue({
    base: "1.8rem",
    sm: "2.2rem",
    lg: "4rem",
  });

  return {
    height: "calc(100% - 3rem)",
    borderTopRightRadius: radius,
    borderTopLeftRadius: radius,
    color: "white",
  };
};

export default useModalStyles;

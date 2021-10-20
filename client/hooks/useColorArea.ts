import { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { ELECTRIC, NORMAL } from "~constants";
import { useTheme } from "@chakra-ui/react";

const useColorArea = () => {
  const { control } = useFormContext();
  const type = useWatch({
    control,
    name: "type",
  });
  const theme = useTheme();

  const color = useMemo(() => {
    if ([ELECTRIC, NORMAL].includes(type.value)) return theme.colors.main;
    return "#ffffff";
  }, [type?.value]);

  return color;
};

export default useColorArea;

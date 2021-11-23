import { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { ELECTRIC, NORMAL } from "~constants";
import { useTheme, useColorModeValue } from "@chakra-ui/react";

const useColorArea = () => {
  const theme = useTheme();
  const basicColor = useColorModeValue("#fff", "#000");
  const alternativColor = useColorModeValue(theme.colors.main, "#000");
  const { control } = useFormContext();
  const type = useWatch({
    control,
    name: "type",
  });

  const color = useMemo(() => {
    if ([ELECTRIC, NORMAL].includes(type.value)) return alternativColor;
    return basicColor;
  }, [type?.value, basicColor, alternativColor]);

  return color;
};

export default useColorArea;

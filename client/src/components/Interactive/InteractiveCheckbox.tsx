import React, { useCallback } from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import Square from "public/assets/img/square.svg";
import SquareCheck from "public/assets/img/square-check.svg";
import { useRecoilValue } from "recoil";
import { areaAtom } from "~atoms/area";
import useColorArea from "~hooks/useColorArea";
import { useFormContext, useWatch } from "react-hook-form";
import InteractiveIcon, {
  Props as InteractiveIconProps,
} from "./InteractiveIcon";

interface Props extends BoxProps {
  name: string;
  x: number;
  y: number;
  height: number;
  width: number;
  icon: Omit<InteractiveIconProps, "icon">;
}

const InteractiveCheckbox = ({
  name,
  x,
  y,
  height,
  width,
  icon,
  ...rest
}: Props) => {
  const { setValue, control } = useFormContext();
  const isChecked: boolean = useWatch({ control, name });
  const { isVisible } = useRecoilValue(areaAtom);
  const areaColor = useColorArea();

  const onClick = useCallback((isChecked) => {
    setValue(name, !isChecked);
  }, []);

  return (
    <Box role="group" onClick={() => onClick(isChecked)}>
      <Box>
        <InteractiveIcon
          icon={isChecked ? <SquareCheck /> : <Square />}
          {...icon}
        />
      </Box>
      <Box
        layerStyle="interactive-el"
        left={`${x}%`}
        top={`${y}%`}
        height={`${height}%`}
        width={`${width}%`}
        borderColor={isVisible ? areaColor : "transparent"}
        {...rest}
      />
    </Box>
  );
};

export default InteractiveCheckbox;

import React, { useRef } from "react";
import { Box, Select } from "@chakra-ui/react";
import { Select as SelectType } from "~@types/CardGenerator";
import { Control, useWatch, useFormContext } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { areaAtom } from "~atoms/area";
import useColorArea from "~hooks/useColorArea";

interface Props {
  name: string;
  x: number;
  y: number;
  height: number;
  width: number;
  control: Control;
  className?: string;
  icon: JSX.Element;
  choices: SelectType<any>[];
  hasEmptyOption?: boolean;
}

const InteractiveSelect = ({
  name,
  x,
  y,
  height,
  width,
  choices,
  control,
  icon,
  hasEmptyOption = true,
}: Props) => {
  const { setValue } = useFormContext();
  const value = useWatch({ control, name });
  const inputRef = useRef(null);
  const { isVisible } = useRecoilValue(areaAtom);
  const areaColor = useColorArea();

  return (
    <Box role="group">
      <Box>{icon}</Box>
      <Box
        pos="absolute"
        overflow="hidden"
        left={`${x}%`}
        top={`${y}%`}
        height={`${height}%`}
        width={`${width}%`}
        className={`InteractiveSelect`}
        borderRadius="xs"
        transition="box-shadow 200ms, border-color 200ms"
        border={`2px solid ${isVisible ? areaColor : "transparent"}`}
        _groupHover={{
          border: "2px solid #fff",
          shadow: "md",
        }}
      >
        <Select
          ref={inputRef}
          variant="unstyled"
          name={name}
          onChange={(event) => {
            const value = event.target.selectedOptions[0].value;

            if (value === "") {
              setValue(name, null);
            } else {
              setValue(name, {
                value,
                label: event.target.selectedOptions[0].text,
              });
            }
          }}
          value={value?.value}
          color="transparent"
          h="100%"
          backgroundColor="transparent"
          textAlign="justify"
          fontFamily="pokehp"
          fontSize="18px"
          cursor="pointer"
        >
          {hasEmptyOption && <option value=""></option>}
          {choices.map(({ label, value }) => (
            <option key={`is-${value}`} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </Box>
    </Box>
  );
};

export default InteractiveSelect;

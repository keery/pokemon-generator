import React, { useState } from "react";
import {
  Image,
  Flex,
  useColorMode,
  useBreakpointValue,
} from "@chakra-ui/react";
import Switch from "react-switch";
import { useFormContext, useWatch } from "react-hook-form";
import {
  WATER,
  FIRE,
  FIGHTING,
  GRASS,
  NORMAL,
  ELECTRIC,
  PSYCHIC,
} from "~constants";

const NesButton = () => {
  const { control } = useFormContext();
  const type = useWatch({ control, name: "type" });
  const { setColorMode, colorMode } = useColorMode();
  const [isChecked, setChecked] = useState(colorMode === "dark");
  const electricColor = useBreakpointValue({ base: "#bfa531", xl: "#fbd83b" });

  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
    setColorMode(nextChecked ? "dark" : "light");
  };

  const TYPE_COLORS = {
    [WATER]: "#92b4ef",
    [GRASS]: "#99dda3",
    [FIRE]: "#eb7272",
    [FIGHTING]: "#f9b56a",
    [NORMAL]: "#209cee",
    [PSYCHIC]: "#ae70ff",
    [ELECTRIC]: electricColor,
  };

  return (
    <Flex>
      <Switch
        onChange={handleChange}
        checked={isChecked}
        onColor={TYPE_COLORS[type.value]}
        offColor="#bdbdbd"
        offHandleColor={"#fff"}
        onHandleColor={"#fff"}
        uncheckedHandleIcon={
          <Flex alignItems="center" justifyContent="center" h="100%">
            <Image src="/assets/img/pixel/gameboy.png" w="90%" />
          </Flex>
        }
        checkedHandleIcon={
          <Flex alignItems="center" justifyContent="center" h="100%">
            <Image src="/assets/img/pixel/gameboy.png" w="90%" />
          </Flex>
        }
        uncheckedIcon={null}
        checkedIcon={null}
      />
    </Flex>
  );
};

export default NesButton;

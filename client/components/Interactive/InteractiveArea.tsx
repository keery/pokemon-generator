import React, { useCallback } from "react";
import {
  useTheme,
  Box,
  BoxProps,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { areaAtom } from "~atoms/area";
import useColorArea from "~hooks/useColorArea";
import Modal from "~components/Interactive/ModalInteractiveArea";

interface Props extends BoxProps {
  x: number;
  y: number;
  height: number;
  width: number;
  inputTarget: string;
  labelTarget: string;
  noRadius?: boolean;
  icon: JSX.Element;
  fields: JSX.Element;
}

const InteractiveArea = ({
  x,
  y,
  height,
  width,
  inputTarget,
  labelTarget,
  noRadius,
  icon,
  fields,
  ...rest
}: Props) => {
  const theme = useTheme();
  const { isVisible } = useRecoilValue(areaAtom);
  const areaColor = useColorArea();
  const isMobile = useBreakpointValue({ base: true, xl: false });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClick = useCallback(() => {
    if (isMobile) {
      onOpen();
    } else {
      document
        .getElementById(labelTarget)
        .scrollIntoView({ behavior: "smooth" });
      document.getElementById(inputTarget).focus({ preventScroll: true });
    }
  }, [isMobile]);

  return (
    <Box role="group" onClick={onClick}>
      {isMobile && (
        <Modal isOpen={isOpen} onClose={onClose}>
          {fields}
        </Modal>
      )}
      <Box>{icon}</Box>
      <Box
        position={"absolute"}
        cursor={"pointer"}
        left={`${x}%`}
        top={`${y}%`}
        height={`${height}%`}
        width={`${width}%`}
        border={"2px solid"}
        borderColor={isVisible ? areaColor : "transparent"}
        borderRadius={noRadius ? "0" : theme.radii.xs}
        transition="box-shadow 200ms, border-color 200ms"
        _groupHover={{
          boxShadow: "0px 0px 9px #a0c2ff",
          borderColor: "#fff",
        }}
        {...rest}
      />
    </Box>
  );
};

export default InteractiveArea;
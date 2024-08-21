import React from "react";
import { useTheme, Box, BoxProps, useDisclosure } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { areaAtom } from "~atoms/area";
import useColorArea from "~hooks/useColorArea";
import Modal from "~components/Interactive/ModalInteractiveArea";
import useModalWithUrl from "~hooks/useModalWithUrl";

interface Props extends BoxProps {
  name: string;
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
  name,
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
  const { onOpen, onClose } = useDisclosure();
  const { onOpenModalWithUrl } = useModalWithUrl({ name, onOpen });

  return (
    <Box role="group" onClick={onOpenModalWithUrl}>
      <Modal name={name} onClose={onClose}>
        {fields}
      </Modal>
      <Box>{icon}</Box>
      <Box
        layerStyle="interactive-el"
        left={`${x}%`}
        top={`${y}%`}
        height={`${height}%`}
        width={`${width}%`}
        borderColor={isVisible ? areaColor : "transparent"}
        borderRadius={noRadius ? "0" : theme.radii.xs}
        {...rest}
      />
    </Box>
  );
};

export default InteractiveArea;

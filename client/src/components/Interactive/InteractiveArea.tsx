import React, { useCallback } from "react";
import { useTheme, Box, BoxProps, useDisclosure } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { areaAtom } from "~atoms/area";
import useColorArea from "~hooks/useColorArea";
import useModal from "~hooks/useModal";
import Modal from "~src/components/Interactive/ModalInteractiveArea";
import { openModalWithUrl } from "~utils/helper";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
  const router = useRouter();
  // const { onOpen, onClose } = useDisclosure();
  const { onOpen, onClose } = useModal(name);

  const onClick = useCallback(() => {
    openModalWithUrl(name, onOpen, router);
  }, [name, router]);

  return (
    // <Box role="group">
    <Box role="group" onClick={onClick}>
      <Modal name={name} onClose={onClose}>
        {fields}
      </Modal>
      <Box>{icon}</Box>
      <Link href="/fr/modal" passHref>
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
      </Link>
    </Box>
  );
};

export default InteractiveArea;

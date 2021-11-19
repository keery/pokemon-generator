import React, { useCallback } from "react";
import { Flex, FlexProps } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import useLongPress from "~hooks/useLongPress";
import PressMenu from "~components/PressMenu";
import Trash from "public/assets/img/trash.svg";
import Resize from "public/assets/img/resize.svg";
import { useTranslation } from "next-i18next";

interface Props extends FlexProps {
  onDelete: () => void;
  onOpen: () => void;
}

const ModalResizeImgButton = ({ onDelete, onOpen, ...rest }: Props) => {
  const { onOpen: openMenu, onClose, isOpen } = useDisclosure();
  const { t } = useTranslation("generator");

  const onLongPress = useCallback((e) => {
    if (
      e.type === "touchstart" ||
      e.type === "touchmove" ||
      e.type === "touchend" ||
      e.type === "touchcancel"
    ) {
      openMenu();
    }
  }, []);

  const longPressEvent = useLongPress(onLongPress);

  return (
    <>
      <PressMenu
        onClose={onClose}
        isOpen={isOpen}
        items={[
          { name: t("remove"), icon: <Trash />, onClick: onDelete },
          { name: t("resize"), icon: <Resize />, onClick: onOpen },
        ]}
      >
        <Flex
          userSelect="none"
          onClick={onOpen}
          cursor="pointer"
          position="absolute"
          {...rest}
          {...longPressEvent}
          onTouchStart={(e) => {
            longPressEvent.onTouchStart(e);
          }}
          onTouchEnd={() => {
            longPressEvent.onTouchEnd();
            if (!isOpen) onOpen();
          }}
        />
      </PressMenu>
    </>
  );
};

export default ModalResizeImgButton;

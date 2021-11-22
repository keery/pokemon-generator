import React from "react";
import Form from "public/assets/img/form.svg";
import { useTranslation } from "next-i18next";
import OptionButton from "~components/PanelOptions/OptionButton";
import { useBreakpointValue } from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  useColorMode,
  Image,
} from "@chakra-ui/react";
import CardForm from "~components/CardForm";

const FormButton = () => {
  const { t } = useTranslation("generator");
  const isVisible = useBreakpointValue({ base: true, xl: false });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  if (!isVisible) return null;

  return (
    <>
      <OptionButton
        icon={
          colorMode === "dark" ? (
            <Image src="/assets/img/pixel/form.png" boxSize="24px" />
          ) : (
            <Form />
          )
        }
        onClick={onOpen}
        label={t("openForm")}
        keyboard_shortcut={["ctrl", "f"]}
      />
      <Drawer placement="bottom" size="full" isOpen={isOpen} onClose={onClose}>
        <DrawerContent
          height="100%"
          layerStyle="glass"
          border="none"
          bgColor="rgb(0 0 0 / 52%)"
        >
          <DrawerCloseButton
            zIndex={99}
            color="white"
            bgColor="rgb(255 255 255 / 33%)"
          />
          <DrawerBody px={{ base: 0, md: 6 }}>
            <CardForm />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FormButton;

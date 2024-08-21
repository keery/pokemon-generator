import React from "react";
import Modal from "~components/Modal";
import Help from "public/assets/img/help-circle.svg";
import {
  Box,
  useDisclosure,
  Flex,
  Text,
  Checkbox,
  VStack,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import useModalWithUrl from "~hooks/useModalWithUrl";

interface Props {
  isAttackValid: boolean;
  isNameValid: boolean;
  isHpValid: boolean;
  isPhotoValid: boolean;
}

const NAME = "publish-requirements";

const Requirement = ({ isChecked, text }) => {
  return (
    <Flex alignItems="center">
      <Checkbox
        isChecked={isChecked}
        size="lg"
        colorScheme="green"
        cursor="default"
      />
      <Text pl={3}>{text}</Text>
    </Flex>
  );
};

const PublishRequirements = ({
  isAttackValid,
  isHpValid,
  isNameValid,
  isPhotoValid,
}: Props) => {
  const t = useTranslations();
  const { onClose, onOpen } = useDisclosure();
  const { onOpenModalWithUrl } = useModalWithUrl({ name: NAME, onOpen });

  return (
    <Modal
      name={NAME}
      onClose={onClose}
      withCloseButton
      button={
        <Box
          onClick={onOpenModalWithUrl}
          pos="relative"
          className="help-ico"
          alignSelf="center"
          marginLeft="0.7rem"
          bgColor="new.1"
          borderRadius="full"
          color="white"
          cursor="pointer"
          fontSize="1.9rem"
          zIndex="4"
          transition="transform 200ms, opacity 100ms"
          _before={{
            content: '""',
            pos: "absolute",
            border: "1px solid white",
            w: "100%",
            h: "100%",
            borderRadius: "100%",
            left: "50%",
            top: "50%",
            transform: "translateX(-50%) translateY(-50%)",
            boxShadow: "inset 0px 0px 8px #fff",
            opacity: 0,
            zIndex: -1,
          }}
          _hover={{
            _before: {
              opacity: 1,
              animation: "wave 1s infinite",
            },
          }}
        >
          <Help />
        </Box>
      }
      title={t("publish.requirements.title")}
    >
      <Flex direction="column">
        <Text>{t("publish.requirements.desc")}</Text>
        <VStack pt={4} alignItems="flex-start">
          <Requirement
            isChecked={isNameValid}
            text={t("publish.requirements.name")}
          />
          <Requirement
            isChecked={isHpValid}
            text={t("publish.requirements.hp")}
          />
          <Requirement
            isChecked={isPhotoValid}
            text={t("publish.requirements.photo")}
          />
          <Requirement
            isChecked={isAttackValid}
            text={t("publish.requirements.attack")}
          />
        </VStack>
      </Flex>
    </Modal>
  );
};

export default PublishRequirements;

import React from "react";
import Modal from "~components/Modal";
import { openModalWithUrl } from "~utils/helper";
import Help from "public/assets/img/help-circle.svg";
import {
  Box,
  useDisclosure,
  Flex,
  Text,
  Checkbox,
  VStack,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

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
  const { t } = useTranslation("generator");
  const { onClose, onOpen } = useDisclosure();

  return (
    <Modal
      name={NAME}
      onClose={onClose}
      withCloseButton
      button={
        <Box
          className="help-ico"
          onClick={() => openModalWithUrl(NAME, onOpen)}
          bgColor="main"
          borderRadius="full"
          pos="absolute"
          top="5px"
          transform="translateY(-50%) translateX(50%)"
          right="5px"
          color="white"
          cursor="pointer"
          fontSize="1.3rem"
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
            transform: "scale(1.2) translateY(-50%) translateX(50%)",
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

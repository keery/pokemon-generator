import React from "react";
import Modal from "~components/Modal";
import { Flex } from "@chakra-ui/react";
import confetti from "canvas-confetti";
import { useTranslation } from "next-i18next";
// confetti({
//   zIndex: 10000,
//   particleCount: 150,
//   spread: 90,
// });

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const PublishedSuccess = ({ isOpen, onClose }: Props) => {
  const { t } = useTranslation("generator");
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      withCloseButton
      title={t("publish.success.title")}
    >
      <div>{t("publish.success.desc")}</div>
    </Modal>
  );
};

export default PublishedSuccess;

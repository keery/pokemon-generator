import React from "react";
import Modal from "~components/Modal";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "next-i18next";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalInteractiveArea = ({ isOpen, onClose, children }: Props) => {
  const { t } = useTranslation("generator");
  const { control } = useFormContext();

  return (
    <Modal isOpen={isOpen} onClose={onClose} withCloseButton>
      {children}
    </Modal>
  );
};

export default ModalInteractiveArea;

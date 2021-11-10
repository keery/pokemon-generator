import React from "react";
import Modal from "~components/Modal";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "next-i18next";

interface Props {
  name: string;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalInteractiveArea = ({ name, onClose, children }: Props) => {
  const { t } = useTranslation("generator");
  const { control } = useFormContext();

  return (
    <Modal name={name} onClose={onClose} withCloseButton>
      {children}
    </Modal>
  );
};

export default ModalInteractiveArea;

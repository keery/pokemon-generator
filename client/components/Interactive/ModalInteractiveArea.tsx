import React from "react";
import Modal from "~components/Modal";

interface Props {
  name: string;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalInteractiveArea = ({ name, onClose, children }: Props) => {
  return (
    <Modal name={name} onClose={onClose} withCloseButton>
      {children}
    </Modal>
  );
};

export default ModalInteractiveArea;

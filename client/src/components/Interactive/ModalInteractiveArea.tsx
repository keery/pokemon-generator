import React from "react";
import Modal from "~src/components/Modal";

interface Props {
  name: string;
  onClose: () => void;
  children: React.ReactNode;
  isOpen: boolean;
}

const ModalInteractiveArea = ({ name, onClose, children, isOpen }: Props) => {
  return (
    <Modal name={name} onClose={onClose} withCloseButton isOpen={isOpen}>
      {children}
    </Modal>
  );
};

export default ModalInteractiveArea;

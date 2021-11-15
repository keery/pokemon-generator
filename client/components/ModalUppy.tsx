import React, { useCallback } from "react";
import { Box, useDisclosure } from "@chakra-ui/react";
import { Dashboard } from "@uppy/react";
import Modal from "~components/Modal";
import dynamic from "next/dynamic";
import useUppy from "~hooks/useUppy";
import { openModalWithUrl, closeModalWithUrl } from "~utils/helper";
import { cardAtom } from "~atoms/card";
import { useSetRecoilState } from "recoil";

interface Props {
  name: string;
  id: string;
  isDesktop: boolean;
}

const PLUGINS = [
  "Instagram",
  "Webcam",
  "Url",
  "GoogleDrive",
  "Facebook",
  "Dropbox",
];

const ModalUppy = ({ id, name, isDesktop }: Props) => {
  const { onOpen, onClose } = useDisclosure();
  const setCardState = useSetRecoilState(cardAtom);

  const onSuccess = useCallback(() => {
    closeModalWithUrl(onClose);
    if (isDesktop) {
      setTimeout(() => {
        setCardState((s) => ({ ...s, selectedImg: name }));
      }, 100);
    }
  }, [isDesktop]);

  const uppy = useUppy({
    id,
    fieldName: name,
    onSuccess,
    onError: () => closeModalWithUrl(onClose),
  });

  return (
    <Modal
      name={name}
      size="xl"
      onClose={onClose}
      button={<Box id={id} onClick={() => openModalWithUrl(name, onOpen)} />}
    >
      <Dashboard
        uppy={uppy}
        plugins={PLUGINS}
        proudlyDisplayPoweredByUppy={false}
        metaFields={[{ id: "name", name: "Name", placeholder: "File name" }]}
      />
    </Modal>
  );
};

export default dynamic(() => Promise.resolve(ModalUppy), {
  ssr: false,
});

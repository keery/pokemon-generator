"use client";
import React, { useCallback } from "react";
import { Box, useDisclosure } from "@chakra-ui/react";
import { Dashboard } from "@uppy/react";
import Modal from "~components/Modal";
import useUppy from "~hooks/useUppy";
import useModalWithUrl from "~hooks/useModalWithUrl";
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

  const { onCloseModalWithUrl, onOpenModalWithUrl } = useModalWithUrl({
    name,
    onOpen,
    onClose,
  });

  const onSuccess = useCallback(() => {
    onCloseModalWithUrl();
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
    onError: () => onCloseModalWithUrl(),
  });

  return (
    <Modal
      withCloseButton
      name={name}
      size="xl"
      onClose={onClose}
      button={<Box id={id} onClick={onOpenModalWithUrl} />}
    >
      <Box pt={4}>
        <Dashboard
          uppy={uppy}
          plugins={PLUGINS}
          proudlyDisplayPoweredByUppy={false}
          allowedMetaFields={[
            { id: "name", name: "Name", placeholder: "File name" },
          ]}
        />
      </Box>
    </Modal>
  );
};

export default ModalUppy;

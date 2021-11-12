import React from "react";
import { Box, useDisclosure } from "@chakra-ui/react";
import { Dashboard } from "@uppy/react";
import French from "@uppy/locales/lib/fr_FR";
import Spanish from "@uppy/locales/lib/es_ES";
import Modal from "~components/Modal";
import dynamic from "next/dynamic";
import useUppy from "~hooks/useUppy";
import { openModalWithUrl, closeModalWithUrl } from "~utils/helper";

const getUppyTranslations = (locale) => {
  switch (locale) {
    case "fr":
      return French;
    case "es":
      return Spanish;
    default:
      return false;
  }
};
interface Props {
  name: string;
  id: string;
}

const PLUGINS = [
  "Instagram",
  "Webcam",
  "Url",
  "GoogleDrive",
  "Facebook",
  "Dropbox",
];

const ModalUppy = ({ id, name }: Props) => {
  const { onOpen, onClose } = useDisclosure();

  const uppy = useUppy({
    id,
    fieldName: name,
    onSuccess: () => closeModalWithUrl(onClose),
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

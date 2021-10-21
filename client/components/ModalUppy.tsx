import React from "react";
import { Box, useDisclosure } from "@chakra-ui/react";
import Uppy from "@uppy/core";
import Url from "@uppy/url";
import { Dashboard, useUppy } from "@uppy/react";
import Webcam from "@uppy/webcam";
import Instagram from "@uppy/instagram";
import Facebook from "@uppy/facebook";
import GoogleDrive from "@uppy/google-drive";
import Dropbox from "@uppy/dropbox";
import XHRUpload from "@uppy/xhr-upload";
import French from "@uppy/locales/lib/fr_FR";
import Spanish from "@uppy/locales/lib/es_ES";
import Modal from "~components/Modal";
import dynamic from "next/dynamic";
import { Control, useController, useFormContext } from "react-hook-form";
import { useTranslation } from "next-i18next";
import axios from "axios";
import useToast from "~hooks/useToast";
import { cardAtom } from "~atoms/card";
import { useSetRecoilState } from "recoil";
import { CARD_DEFAULT_STATE } from "~data/card";

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
  control: Control;
}

const PLUGINS = [
  "Instagram",
  "Webcam",
  "Url",
  "GoogleDrive",
  "Facebook",
  "Dropbox",
];
const COMPANION_URL = `${process.env.NEXT_PUBLIC_API_URL}/image/companion`;

const ModalUppy = ({ id, name, control }: Props) => {
  const { setValue } = useFormContext();
  const setCardState = useSetRecoilState(cardAtom);
  const { errorToast } = useToast();
  const { i18n, t } = useTranslation("generator");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { field } = useController({
    name,
    control,
  });

  const uppy = useUppy(() => {
    return new Uppy({
      id,
      autoProceed: true,
      locale: getUppyTranslations(i18n.language),
      debug: true,
      allowMultipleUploads: false,
      restrictions: {
        maxFileSize: 1000000,
        maxNumberOfFiles: 1,
        allowedFileTypes: ["image/*"],
      },
    })
      .use(XHRUpload, {
        endpoint: `${process.env.NEXT_PUBLIC_API_URL}/image/upload`,
        getResponseData: (responseText, response) => ({
          url: responseText,
        }),
      })
      .use(Webcam)
      .use(Url, {
        companionUrl: COMPANION_URL,
      })
      .use(Dropbox, {
        companionUrl: COMPANION_URL,
      })
      .use(Instagram, {
        companionUrl: COMPANION_URL,
      })
      .use(Facebook, {
        companionUrl: COMPANION_URL,
      })
      .use(GoogleDrive, {
        companionUrl: COMPANION_URL,
      })
      .on("upload-success", (file, response) => {
        axios
          .get(
            `${process.env.NEXT_PUBLIC_API_URL}/image/tmp/get/${response.body.url}`,
            {
              responseType: "blob",
            }
          )
          .then((res) => {
            const reader = new FileReader();
            reader.onload = function (e) {
              field.onChange(e.target.result);
              onClose();
              uppy.reset();

              // Reset transformation values
              setValue(`${name}X`, CARD_DEFAULT_STATE[`${name}X`]);
              setValue(`${name}Y`, CARD_DEFAULT_STATE[`${name}Y`]);
              setValue(`${name}ScaleX`, CARD_DEFAULT_STATE[`${name}ScaleX`]);
              setValue(`${name}ScaleY`, CARD_DEFAULT_STATE[`${name}ScaleY`]);

              // Select uploaded image
              setTimeout(() => {
                setCardState((s) => ({ ...s, selectedImg: name }));
              }, 100);
            };
            reader.readAsDataURL(res.data);
          })
          .catch(() => {
            onClose();
            uppy.reset();
            errorToast(t("uploadFailed"));
          });
      });
  });

  return (
    <Modal
      size="xl"
      onClose={onClose}
      isOpen={isOpen}
      button={<Box id={id} onClick={onOpen} />}
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

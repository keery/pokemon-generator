import Webcam from "@uppy/webcam";
import Instagram from "@uppy/instagram";
import Facebook from "@uppy/facebook";
import GoogleDrive from "@uppy/google-drive";
import Dropbox from "@uppy/dropbox";
import XHRUpload from "@uppy/xhr-upload";
import Uppy from "@uppy/core";
import Url from "@uppy/url";
import French from "@uppy/locales/lib/fr_FR";
import Spanish from "@uppy/locales/lib/es_ES";
import { useUppy as useUppyReact } from "@uppy/react";
import { useTranslation } from "next-i18next";
import useToast from "~hooks/useToast";
import { useFormContext } from "react-hook-form";
import { CARD_DEFAULT_STATE } from "~data/card";
import { client } from "~api/client";

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

const COMPANION_URL = `${process.env.NEXT_PUBLIC_API_URL}/image/companion`;
const MAX_FILE_SIZE = 2000000;
interface Params {
  id: string;
  onSuccess?: () => void;
  onError?: () => void;
  fieldName: string;
}

const useUppy = ({ fieldName, id, onError, onSuccess }: Params) => {
  const { setValue } = useFormContext();
  const { t, i18n } = useTranslation("generator");
  const { errorToast } = useToast();

  const uppy = useUppyReact(() => {
    const instance = new Uppy({
      id,
      autoProceed: true,
      locale: getUppyTranslations(i18n.language),
      debug: true,
      allowMultipleUploads: false,
      restrictions: {
        maxFileSize: MAX_FILE_SIZE,
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
      .on("restriction-failed", (event) => {
        if (event.size > MAX_FILE_SIZE) {
          errorToast(t("fileTooBig", { max: MAX_FILE_SIZE * 0.000001 }));
        }
      })
      .on("upload-success", (file, response) => {
        client
          .get(`/image/tmp/get/${response.body.url}`, {
            responseType: "blob",
          })
          .then((res) => {
            const reader = new FileReader();
            reader.onload = function (e) {
              if (onSuccess) onSuccess();

              setValue(fieldName, e.target.result);
              uppy.reset();

              // Reset transformation values
              setValue(
                `${fieldName}ScaleX`,
                CARD_DEFAULT_STATE[`${fieldName}ScaleX`]
              );
              setValue(
                `${fieldName}ScaleY`,
                CARD_DEFAULT_STATE[`${fieldName}ScaleY`]
              );
            };
            reader.readAsDataURL(res.data);
          })
          .catch(() => {
            if (onError) onError();
            uppy.reset();
            errorToast(t("uploadFailed"));
          });
      });

    return instance;
  });

  return uppy;
};

export default useUppy;

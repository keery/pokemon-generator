import React, { useState } from "react";
import { Box, Text, Icon, Flex, useDisclosure, Image } from "@chakra-ui/react";
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
import Upload from "public/assets/img/upload.svg";
import dynamic from "next/dynamic";
import { Control, useController } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { saveAs } from "file-saver";

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
  control: Control;
}

const COMPANION_URL = `${process.env.NEXT_PUBLIC_API_URL}/image/companion`;

const FileInput = ({ name, control }: Props) => {
  const { i18n } = useTranslation("generator");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { field } = useController({
    name,
    control,
  });

  const [isUploaded, setUploaded] = useState(false);
  const [file, setFile] = useState(null);

  const uppy = useUppy(() => {
    return new Uppy({
      id: name,
      autoProceed: true,
      locale: getUppyTranslations(i18n.language),
      debug: true,
      allowMultipleUploads: false,
      restrictions: {
        // maxFileSize: 1000000,
        maxNumberOfFiles: 1,
        allowedFileTypes: ["image/*"],
      },
    })
      .use(XHRUpload, {
        // responseType: "arraybuffer",
        endpoint: `${process.env.NEXT_PUBLIC_API_URL}/image/upload`,
        getResponseData: (responseText, response) => {
          console.log(response);
          return {
            // url: responseText,
            url: "https://static01.nyt.com/images/2020/12/14/well/14google-photo/14google-photo-mediumSquareAt3X.jpg",
          };
        },
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
        const reader = new FileReader();
        reader.onload = function (e) {
          field.onChange(e.target.result);
          setUploaded(true);
          onClose();
          uppy.reset();
        };
        // reader.readAsDataURL(response.body.url);
        reader.readAsDataURL(file.data);
      });
  });

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      button={
        <>
          <Flex
            onClick={onOpen}
            direction="column"
            justifyContent="center"
            height={10}
            width="100%"
            borderRadius="sm"
            border="1px solid #cacaca"
            overflow="hidden"
            pos="relative"
            bgColor="rgb(255 255 255 / 30%)"
            cursor="pointer"
            _hover={{
              borderColor: "#77b2f5",
            }}
            transition="border-color 200ms"
          >
            <Text color="grey.500" fontSize=".9rem" fontWeight="600" pl="10px">
              Choisir une photo
            </Text>
            <Icon
              as={Upload}
              position="absolute"
              left={isUploaded ? 0 : "calc(100% - 38px)"}
              top="50%"
              transform="translateY(-50%)"
              background="linear-gradient(#516fb3, #6e91e0)"
              borderRadius="sm"
              h="38px"
              w="38px"
              color="#fff"
              transition="left ease-in-out 0.5s"
              zIndex="1"
              p=".7rem"
            />
            <Box
              position="absolute"
              top="0px"
              bottom="0px"
              w="100%"
              left={isUploaded ? "19px" : "calc(100% - 19px)"}
              transition="left ease-in-out 0.5s"
              background="linear-gradient(#516fb3, #6e91e0)"
              pl="3rem"
              color="white"
              fontWeight="bold"
              display="flex"
              alignItems="center"
              _hover={{
                backgroundColor: isUploaded ? "orange.400" : "orange.500",
              }}
            >
              <Text textOverflow="ellipsis" w="80%" overflow="hidden">
                upload label
              </Text>
            </Box>
          </Flex>
          {!!file && <Image src={file} />}
        </>
      }
      size="xl"
    >
      <Dashboard
        uppy={uppy}
        plugins={[
          "Instagram",
          "Webcam",
          "Url",
          "GoogleDrive",
          "Facebook",
          "Dropbox",
        ]}
        proudlyDisplayPoweredByUppy={false}
        metaFields={[{ id: "name", name: "Name", placeholder: "File name" }]}
      />
    </Modal>
  );
};

export default dynamic(() => Promise.resolve(FileInput), {
  ssr: false,
});

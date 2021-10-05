import React, { useState } from "react";
import { Box, Text, Icon, Flex, useDisclosure } from "@chakra-ui/react";
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

  // constructor(props) {
  //   super(props);

  //   this.uppy = new Uppy({
  //     id: props.name,
  //     autoProceed: true,
  //     // locale: getUppyTranslations(language),
  //     debug: true,
  //     allowMultipleUploads: false,
  //   }).use(DragDrop, {
  //     target: null,
  //     width: "100%",
  //     height: "100%",
  //     note: null,
  //     locale: {},
  //   });
  //   // .use(Webcam)
  //   // .use(Instagram, {
  //   //   companionUrl: process.env.NEXT_PUBLIC_API_URL,
  //   // })
  //   // .use(Url, {
  //   //   companionUrl: process.env.NEXT_PUBLIC_API_URL,
  //   // })
  //   // .use(Transloadit, {
  //   //   debug: true,
  //   //   // signature: TRANSLOADIT_SECRET,
  //   //   params: {
  //   //     auth: {
  //   //       // expires: dayjs().add(6, 'hour').format('YYYY/MM/DD HH:mm:ss+00:00'),
  //   //       key: TRANSLOADIT_KEY,
  //   //     },
  //   //     template_id: TRANSLOADIT_TEMPLATE_ID,
  //   //   },
  //   // })
  //   // .use(XHRUpload, {
  //   //   endpoint: `${process.env.NEXT_PUBLIC_API_URL}/api/file/upload`,
  //   // });

  //   if (props.value) {
  //     this.state = {
  //       isUploaded: true,
  //       uploadLabel: props.value.name,
  //     };
  //   } else {
  //     this.state = EMPTY_STATE;
  //   }
  // }

  // componentDidMount() {
  //   const { onChange, name } = this.props;
  //   this.uppy.on("transloadit:result", (stepName, result) => {
  //     const file = this.uppy.getFile(result.localId);
  //     this.setState({
  //       uploadLabel: file.name,
  //       isUploaded: true,
  //     });
  //     onChange({
  //       target: {
  //         name,
  //         value: {
  //           src: file.response.uploadURL,
  //           name: file.name,
  //         },
  //         getAttribute: () => false,
  //       },
  //     });
  //     this.uppy.reset();
  //     // this.context.closeModal()
  //   });
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.value !== this.props.value && !this.props.value) {
  //     this.setState(EMPTY_STATE);
  //   }
  // }

  // componentWillUnmount() {
  //   this.props.uppy.off("upload-success");
  //   this.props.uppy.close();
  // }

  // handleFile = (event) => {
  //   const { isUploaded } = this.state
  //   console.log(isUploaded)
  //   this.setState({
  //     // uploadLabel: file.name,
  //     isUploaded: !isUploaded,
  //   })
  //   // this.context.openModalWith(
  //     <Dashboard
  //       uppy={this.props.uppy}
  //       plugins={['Instagram', 'Webcam', 'Url']}
  //       proudlyDisplayPoweredByUppy={false}
  //       metaFields={[{ id: 'name', name: 'Name', placeholder: 'File name' }]}
  //       browserBackButtonClose
  //     />
  //   )
  // }

  const uppy = useUppy(() => {
    return new Uppy({
      id: name,
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
          url: "https://static01.nyt.com/images/2020/12/14/well/14google-photo/14google-photo-mediumSquareAt3X.jpg",
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
        field.onChange(response.body.url);
        setUploaded(true);
        onClose();
        uppy.reset();
      });
  });

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      button={
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

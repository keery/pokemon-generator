import React from "react";
import {
  Flex,
  Box,
  useDisclosure,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { Control, useFormContext, useWatch } from "react-hook-form";
import InteractiveIcon, {
  Props as InteractiveIconProps,
} from "./InteractiveIcon";
import Delete from "public/assets/img/delete.svg";
import Image from "public/assets/img/image.svg";
import { BASIC } from "~constants";
import { areaAtom } from "~atoms/area";
import { useRecoilValue } from "recoil";
import { DragDrop } from "@uppy/react";
import useUppy from "~hooks/useUppy";
import { openModalWithUrl, closeModalWithUrl } from "~utils/helper";
import ModalResizeImg from "~components/Interactive/ModalResizeImg";
import ModalResizeImgButton from "~components/Interactive/ModalResizeImgButton";

interface Props {
  control: Control;
  zIndex?: number;
  width: number;
  height: number;
  x: number;
  y: number;
  name: string;
  noText?: boolean;
  icon: Omit<InteractiveIconProps, "icon">;
  resizeModalConf: {
    originalWidth: number;
    originalHeight: number;
    heightImgArea: number;
    widthImgArea: number;
    width: number;
    height: number;
  };
}

const InteractiveFile = ({
  width,
  height,
  x,
  y,
  name,
  control,
  icon,
  zIndex,
  resizeModalConf,
}: Props) => {
  const isMobile = useBreakpointValue({ base: true, xl: false });
  const { isVisible } = useRecoilValue(areaAtom);
  const { setValue } = useFormContext();
  const [value, stage] = useWatch({ control, name: [name, "stage"] });
  const { onClose } = useDisclosure();
  const uppy = useUppy({
    id: `${name}-interactive`,
    fieldName: name,
  });
  const borderRadius = useColorModeValue("100%", "none");
  const onDelete = () => setValue(name, null);

  return (
    <Box role="group">
      {Boolean(value) ? (
        <InteractiveIcon
          icon={<Delete fill="#fe5b54" fontSize="1.7rem" />}
          {...icon}
          p={0}
          borderRadius={borderRadius}
          label={""}
          onClick={onDelete}
        />
      ) : (
        <InteractiveIcon icon={<Image width="1rem" alt="Delete" />} {...icon} />
      )}

      {!Boolean(value) ? (
        <Flex
          alignItems="center"
          justifyContent="center"
          role="group"
          h="100%"
          zIndex={zIndex}
          cursor="pointer"
          position="absolute"
          left={`${x}%`}
          top={`${y}%`}
          height={`${height}%`}
          width={`${width}%`}
        >
          <Flex
            className={isVisible ? "interactive-file-visible" : ""}
            color="main"
            direction="column"
            w="100%"
            h="100%"
            alignItems="center"
          >
            <Flex
              w={"100%"}
              justifyContent="center"
              h="100%"
              className={`drag-drop ${
                stage.value !== BASIC ? "is-stage" : ""
              } ${
                name === "mainImage" ? "is-main-image" : "is-evolve-picture"
              }`}
              zIndex={name !== "mainImage" ? 999 : null}
              fontSize={{ base: "0.8rem", sm: "0.9rem", md: "1rem" }}
            >
              <DragDrop
                uppy={uppy}
                width="100%"
                height="100%"
                onClick={(event) => {
                  event.preventDefault();
                  if (Boolean(value)) {
                    setValue(name, null);
                  } else {
                    document.getElementById(name).click();
                  }
                }}
              />
            </Flex>
          </Flex>
        </Flex>
      ) : (
        isMobile && (
          <>
            <ModalResizeImgButton
              onOpen={() => openModalWithUrl(`resize-${name}`, onClose)}
              onDelete={onDelete}
              left={`${x}%`}
              top={`${y}%`}
              height={`${height}%`}
              width={`${width}%`}
              zIndex={zIndex}
            />
            <ModalResizeImg
              name={name}
              modalName={`resize-${name}`}
              onClose={() => closeModalWithUrl(onClose)}
              resizeModalConf={resizeModalConf}
            />
          </>
        )
      )}
    </Box>
  );
};

export default InteractiveFile;

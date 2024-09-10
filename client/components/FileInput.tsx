import React from "react";
import { Box, Text, Flex, useTheme } from "@chakra-ui/react";
import Upload from "public/assets/img/upload.svg";
import Check from "public/assets/img/check.svg";
import dynamic from "next/dynamic";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslations } from "next-intl";
import FileInputPixel from "~components/FileInputPixel";

interface Props {
  name: string;
}

const FileInput = ({ name }: Props) => {
  const t = useTranslations();
  const { setValue, control } = useFormContext();
  const theme = useTheme();
  const value = useWatch({
    name,
    control,
  });

  const deleteFile = () => {
    setValue(name, null);
  };

  const onClick = () => document.getElementById(name).click();

  return (
    <Box>
      <Flex
        direction="column"
        justifyContent="center"
        height={10}
        width="100%"
        borderRadius="sm"
        border="1px solid #bdccde"
        overflow="hidden"
        pos="relative"
        bgColor="rgb(255 255 255 / 30%)"
        _hover={{
          borderColor: "#77b2f5",
        }}
        transition="border-color 200ms"
      >
        <Text
          onClick={onClick}
          color="grey.500"
          fontSize=".9rem"
          fontWeight="500"
          pl="10px"
          cursor="pointer"
        >
          {t("choosePicture")}
        </Text>
        <Box
          position="absolute"
          left={Boolean(value) ? 0 : "calc(100% - 37px)"}
          top="50%"
          transform="translateY(-50%)"
          bgColor="new.1"
          borderRadius="sm"
          h="38px"
          w="38px"
          color="white"
          transition="left ease-in-out 0.5s"
          zIndex="1"
          p=".7rem"
          overflow="hidden"
        >
          {/* 
          //TODO: if one day I wanna use the rainbow background
          <Box
            pos={"absolute"}
            borderRadius={"100%"}
            width={"130%"}
            height={"130%"}
            left="50%"
            top="50%"
            transform={"translateX(-50%) translateY(-50%)"}
            boxShadow={`rgb(255 255 255 / 60%) 0px 0px 0px 0.5px inset, ${theme.colors.new[4]} 9px 9px 0px 0px inset, ${theme.colors.new[1]} 18px 18px 0px 0px inset, ${theme.colors.new[2]} 27px 27px 0px 0px inset, ${theme.colors.new[3]} 36px 36px 0px 0px inset`}
          /> */}
          <Box as="span" pos="relative">
            {Boolean(value) ? <Check /> : <Upload />}
          </Box>
        </Box>
        <Box
          position="absolute"
          top="0px"
          bottom="0px"
          w="100%"
          left={Boolean(value) ? "19px" : "calc(100% - 19px)"}
          transition="left ease-in-out 0.5s"
          bgColor="new.1"
          pl="3rem"
          color="white"
          fontWeight="bold"
          display="flex"
          alignItems="center"
          cursor="default"
          pointerEvents="unset"
        >
          <Text
            textOverflow="ellipsis"
            w="80%"
            overflow="hidden"
            fontSize=".9rem"
            fontWeight="600"
          >
            {t("pictureAdded")}
          </Text>
        </Box>
      </Flex>
      {Boolean(value) && (
        <Text
          fontSize="0.7rem"
          mt={0.5}
          cursor="pointer"
          onClick={deleteFile}
          _hover={{
            textDecoration: "underline",
          }}
        >
          {t("removePicture")}
        </Text>
      )}
    </Box>
  );
};

export default dynamic(() => Promise.resolve(FileInput), {
  ssr: false,
});

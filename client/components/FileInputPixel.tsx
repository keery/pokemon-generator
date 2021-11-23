import React from "react";
import { Box, Button } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";

interface Props {
  name: string;
  onClick: () => void;
  deleteFile: () => void;
  value: string;
}

const FileInputPixel = ({ onClick, deleteFile, value }: Props) => {
  const { t } = useTranslation("generator");

  return (
    <Box>
      <Button
        direction="column"
        justifyContent="center"
        height={10}
        width="100%"
        variant={Boolean(value) ? "nes-button-red" : "nes-button"}
        colorScheme="red"
        onClick={Boolean(value) ? deleteFile : onClick}
        borderRadius="none"
      >
        {Boolean(value) ? t("removePicture") : t("choosePicture")}
      </Button>
    </Box>
  );
};

export default dynamic(() => Promise.resolve(FileInputPixel), {
  ssr: false,
});

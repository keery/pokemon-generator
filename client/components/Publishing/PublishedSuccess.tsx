import React, { useEffect } from "react";
import Modal from "~components/Modal";
import { Flex, Image, Text, Button, HStack } from "@chakra-ui/react";
import confetti from "canvas-confetti";
import { useTranslation } from "next-i18next";
import Link from "~components/Link";
import { ROUTE_GALLERY } from "~constants";
import useResetCard from "~hooks/useResetCard";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const PublishedSuccess = ({ isOpen, onClose }: Props) => {
  const { t } = useTranslation("generator");
  const resetCard = useResetCard(onClose);

  useEffect(() => {
    if (isOpen) {
      confetti({
        zIndex: 10000,
        particleCount: 150,
        spread: 90,
      });
    }
  }, [isOpen]);

  return (
    <Modal
      size="lg"
      isOpen={isOpen}
      onClose={() => null}
      title={
        <Flex mt="-60%" direction="column" alignItems="center">
          <Image src="/assets/img/success.gif" maxW="400px" />
          <Text fontSize="3rem" textAlign="center">
            {t("publish.success.title")} 🎉
          </Text>
        </Flex>
      }
    >
      <Text fontWeight="bold" fontSize="1.1rem">
        {t("publish.success.desc")}
      </Text>
      <Text mt={2}>{t("publish.success.review")}</Text>
      <Text>{t("publish.success.email")}</Text>
      <Text mt={2}>{t("publish.success.thanks")}</Text>
      <HStack spacing={4} alignItems="center" mt={4}>
        <Button
          width="full"
          onClick={() => {
            resetCard();
          }}
          variant="outline"
          borderRadius="xl"
        >
          {t("publish.success.createNew")}
        </Button>
        <Button as={Link} href={ROUTE_GALLERY} width="full">
          {t("publish.success.seeGallery")}
        </Button>
      </HStack>
    </Modal>
  );
};

export default PublishedSuccess;

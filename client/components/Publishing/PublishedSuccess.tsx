import React, { useEffect } from "react";
import Modal from "~components/Modal";
import { Flex, Image, Text, HStack } from "@chakra-ui/react";
import confetti from "canvas-confetti";
import { useTranslations } from "next-intl";
import Link from "~components/Link";
import Button from "~components/Button";
import { ROUTE_GALLERY } from "~constants";
import useResetCard from "~hooks/useResetCard";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const PublishedSuccess = ({ isOpen, onClose }: Props) => {
  const t = useTranslations();
  const resetCard = useResetCard();

  useEffect(() => {
    if (isOpen) {
      resetCard();
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
      <HStack spacing={4} alignItems="center" mt={4} justifyContent="center">
        <Button onClick={onClose} flex={1} variant="outline">
          {t("publish.success.createNew")}
        </Button>

        <Button
          as={Link}
          href={ROUTE_GALLERY}
          style={{ flex: 1 }}
          w="100%"
          layerColors={["new.1", "new.4", "new.3"]}
          color="white"
        >
          {t("publish.success.seeGallery")}
        </Button>
      </HStack>
    </Modal>
  );
};

export default PublishedSuccess;

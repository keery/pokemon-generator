import React, { useMemo } from "react";
import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useFormContext } from "react-hook-form";
import { GRADIENTS } from "~constants";
import useAttacks from "~hooks/useAttacks";
import PublishRequirements from "~components/Publishing/PublishRequirements";
import PublishConfirmation from "~components/Publishing/PublishConfirmation";
import { useRecoilValue } from "recoil";
import { cardImgAtom } from "~atoms/card-img";

const PublishButton = () => {
  const { t } = useTranslation("generator");
  const { control, watch } = useFormContext();
  const [type, name, hp, mainImage] = watch([
    "type",
    "name",
    "hp",
    "mainImage",
  ]);
  const { attack1isComplete, attack2isComplete } = useAttacks(control);
  const { onClose, onOpen, isOpen } = useDisclosure();
  const isNameValid = name.trim() !== "";
  const isHpValid = Boolean(hp);
  const isPhotoValid = Boolean(mainImage);
  const { isLoading } = useRecoilValue(cardImgAtom);

  const isDisabled = useMemo(() => {
    return (
      (!attack1isComplete && !attack2isComplete) ||
      !isNameValid ||
      !isHpValid ||
      !isPhotoValid
    );
  }, [
    attack1isComplete,
    attack2isComplete,
    isNameValid,
    isHpValid,
    isPhotoValid,
  ]);

  return (
    <Flex mt={4} pos="relative">
      {isDisabled && (
        <PublishRequirements
          isAttackValid={attack1isComplete || attack2isComplete}
          isNameValid={isNameValid}
          isHpValid={isHpValid}
          isPhotoValid={isPhotoValid}
        />
      )}
      <PublishConfirmation onClose={onClose} isOpen={isOpen}>
        <Button
          onClick={onOpen}
          isDisabled={isDisabled || isLoading}
          borderRadius="sm"
          w="full"
          background={GRADIENTS[type.value]}
          fontSize="md"
          color="main"
          backdropFilter="blur(4px) saturate(180%)"
          bgColor="rgb(255 255 255 / 0%)"
          border="1px solid rgb(255 255 255 / 60%)"
          height="55px"
          textTransform="uppercase"
          fontWeight="600"
          letterSpacing="1.5px"
          overflow="hidden"
          transition="all 200ms"
          _active={{
            bgColor: "white",
            transform: "scale(0.95)",
          }}
          _before={{
            content: '""',
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "100%",
            height: "100%",
            background:
              "linear-gradient( 120deg, transparent, rgba(255,255,255, 0.4), transparent )",
            transition: "all 650ms",
          }}
          _hover={{
            boxShadow: "1px 1px 25px 0px rgb(34 34 34 / 11%)",
            _before: {
              left: "100%",
            },
          }}
        >
          {t("publish.button")}
        </Button>
      </PublishConfirmation>
    </Flex>
  );
};

export default PublishButton;

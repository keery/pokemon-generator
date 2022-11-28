import React, { useMemo } from "react";
import { Flex, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useFormContext } from "react-hook-form";
import { GRADIENTS } from "~constants";
import ElementButton from "~components/ElementButton";
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
      <PublishConfirmation onClose={onClose} isOpen={isOpen}>
        <ElementButton
          onClick={onOpen}
          isDisabled={isDisabled || isLoading}
          w="full"
          element={type.value}
          fontSize="md"
        >
          {t("publish.button")}
        </ElementButton>
      </PublishConfirmation>
      {isDisabled && (
        <PublishRequirements
          isAttackValid={attack1isComplete || attack2isComplete}
          isNameValid={isNameValid}
          isHpValid={isHpValid}
          isPhotoValid={isPhotoValid}
        />
      )}
    </Flex>
  );
};

export default PublishButton;

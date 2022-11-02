import React, { useState } from "react";
import {
  ButtonProps,
  Icon,
  Flex,
  Box,
  useDisclosure,
  Text,
  Button,
  HStack,
} from "@chakra-ui/react";
import Select from "~components/Select";
import { Select as SelectOption } from "~constants";
import { Card } from "~@types/Card";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import Report from "public/assets/img/report.svg";
import Modal from "~components/Modal";
import Field from "~components/Field";
import Textarea from "~components/Textarea";
import { useForm, FormProvider } from "react-hook-form";
import useCreateReport from "~hooks/useCreateReport";
import useToast from "~hooks/useToast";

interface Props extends ButtonProps {
  card: Card;
}

const OTHER = "other";

const ReportButton = ({ card }: Props) => {
  const { t } = useTranslation("gallery");
  const { onClose, onOpen, isOpen } = useDisclosure();
  const form = useForm();
  const reason = form.watch("reason");
  const { errorToast, successToast } = useToast();
  const [isDisabled, setDisabled] = useState(false);

  const { mutate, isLoading } = useCreateReport({
    onSuccess: () => {
      successToast(t("modal.report.success"));
      setDisabled(true);
    },
    onError: () => {
      errorToast(t("modal.report.error"));
    },
    onSettled: () => {
      onClose();
    },
  });

  const onSubmit = ({
    reason,
    description,
  }: {
    reason: SelectOption<string>;
    description: string;
  }) => {
    mutate({ reason: reason.value, description, card: { id: card.id } });
  };

  return (
    <Modal
      size="xl"
      isOpen={isOpen}
      onClose={onClose}
      withCloseButton
      isUrlChanging={false}
      button={
        <Button
          as={motion.button}
          style={{
            alignItems: "center",
            display: "flex",
            transitionDuration: "100ms",
            transitionTimingFunction: "ease-in-out",
            transitionProperty: "transform",
            borderRadius: "0.8rem",
            padding: "0.5rem 1.5rem 0.5rem 0.8rem",
            fontSize: "1.2rem",
            border: "1px solid",
            borderColor: "#A0AEC0",
            backgroundColor: "transparent",
            height: "auto",
          }}
          _hover={{
            opacity: "auto",
          }}
          initial={{
            scale: 1,
          }}
          whileTap={{
            scale: 0.9,
          }}
          whileHover={{
            scale: 1.05,
          }}
          onClick={() => {
            if (!isDisabled) {
              onOpen();
            }
          }}
          isDisabled={isDisabled}
        >
          <Flex
            justifyContent="center"
            alignItems="center"
            w="2.5rem"
            h="2.5rem"
            alignSelf="center"
          >
            <Icon as={Report} fontSize="1.4rem" w="2.5rem" height="1.5rem" />
          </Flex>
          <Box ml="0.3rem">{t("modal.report.button")}</Box>
        </Button>
      }
      title={
        <Flex alignItems="center">
          <Icon as={Report} w="3rem" height="2.2rem" />
          {t("modal.report.title", { name: card.name })}
        </Flex>
      }
    >
      <Text>{t("modal.report.description")}</Text>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Field label={t("modal.report.label")} mt="1rem">
            <Select
              name="reason"
              hasColorInverted
              options={[
                {
                  value: "nudity",
                  label: t("modal.report.choice1") as string,
                },
                {
                  value: "inciting_hatred",
                  label: t("modal.report.choice2") as string,
                },
                {
                  value: "harassment",
                  label: t("modal.report.choice3") as string,
                },
                {
                  value: "personal_information",
                  label: t("modal.report.choice4") as string,
                },
                {
                  value: OTHER,
                  label: t("modal.report.other") as string,
                },
              ]}
            />
          </Field>
          {reason && reason.value === OTHER && (
            <Field label={t("modal.report.labelOther")} mt="1rem">
              <Textarea name="description" />
            </Field>
          )}
          <HStack justifyContent="flex-end" mt={2} spacing={2}>
            <Button variant="outline" isDisabled={isLoading} onClick={onClose}>
              {t("common:cancel")}
            </Button>
            <Button variant="glass" type="submit" isLoading={isLoading}>
              {t("common:confirm")}
            </Button>
          </HStack>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default ReportButton;

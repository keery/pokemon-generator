import React, { useState } from "react";
import Modal from "~components/Modal";
import { Flex, Text, Checkbox, Button } from "@chakra-ui/react";
import { useTranslation, Trans } from "next-i18next";
import Link from "~components/Link";
import PublishedSuccess from "~components/Publishing/PublishedSuccess";
import WarningBox from "~components/WarningBox";
import { ROUTE_CGU } from "~constants";
import { useFormContext } from "react-hook-form";
import { getPublishData } from "~utils/card";
import usePublishCard from "~hooks/usePublishCard";
import useToast from "~hooks/useToast";

interface Props {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

const PublishConfirmation = ({ children, onClose, isOpen }: Props) => {
  const { t } = useTranslation("generator");
  const [isChecked, setChecked] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isPublished, setPublished] = useState(false);
  const { getValues } = useFormContext();
  const { mutate } = usePublishCard();
  const { errorToast } = useToast();

  const onSubmit = async () => {
    try {
      setLoading(true);
      const values = await getPublishData(getValues());
      mutate(values);
      // setPublished(true);
      // setChecked(false);
      // onClose();
    } catch (e) {
      errorToast(t("publishFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        size="2xl"
        isOpen={isOpen}
        onClose={onClose}
        withCloseButton
        button={<Flex w="100%">{children}</Flex>}
        title={t("publish.confirm.title")}
      >
        <Flex>{t("publish.confirm.desc")}</Flex>
        <WarningBox my={6} fontSize="0.9rem">
          {t("publish.confirm.warning")}
        </WarningBox>
        <Flex bgColor="#f7f7f7" borderRadius="sm" px={6} py={6}>
          <Flex as="label" alignItems="flex-start">
            <Checkbox
              size="lg"
              mt={1}
              colorScheme="green"
              bgColor="white"
              borderRadius="sm"
              isChecked={isChecked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            <Text pl={4}>
              <Trans
                i18nKey="generator:publish.confirm.checkbox"
                components={{
                  a: <Link href={ROUTE_CGU} textDecoration="underline" />,
                }}
              />
            </Text>
          </Flex>
        </Flex>
        <Flex justifyContent="flex-end" pt={4}>
          <Button
            isLoading={isLoading}
            isDisabled={!isChecked}
            onClick={onSubmit}
          >
            {t("publish.button")}
          </Button>
        </Flex>
      </Modal>
      <PublishedSuccess
        isOpen={isPublished}
        onClose={() => setPublished(false)}
      />
    </>
  );
};

export default PublishConfirmation;

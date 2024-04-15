import React, { useState } from "react";
import Modal from "~src/components/Modal";
import { Flex, Text, Checkbox, Input } from "@chakra-ui/react";
import { useTranslations, Trans } from "next-intl";
import Link from "~src/components/Link";
import PublishedSuccess from "~src/components/Publishing/PublishedSuccess";
import WarningBox from "~src/components/WarningBox";
import Button from "~src/components/Button";
import { ROUTE_CGU } from "~constants";
import { useFormContext } from "react-hook-form";
import { getPublishData } from "~utils/card";
import usePublishCard from "~hooks/usePublishCard";
import useToast from "~hooks/useToast";
import Field from "~src/components/Field";

interface Props {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

const PublishConfirmation = ({ children, onClose, isOpen }: Props) => {
  const t = useTranslations("generator");
  const [author, setAuthor] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isPublished, setPublished] = useState(false);
  const { getValues } = useFormContext();
  const { errorToast } = useToast();

  const { mutate } = usePublishCard({
    onMutate: () => setLoading(true),
    onSettled: () => setLoading(false),
    onSuccess: () => {
      setPublished(true);
      setChecked(false);
      onClose();
    },
    onError: () => {
      errorToast(t("publishFailed"));
    },
  });

  const onSubmit = async () => {
    const values = await getPublishData({ ...getValues(), author });
    await mutate(values);
  };

  return (
    <>
      <Modal
        size="2xl"
        isOpen={isOpen}
        onClose={() => {
          setChecked(false);
          onClose();
        }}
        withCloseButton
        button={<Flex w="100%">{children}</Flex>}
        title={t("publish.confirm.title")}
      >
        <Flex>{t("publish.confirm.desc")}</Flex>

        <Field label={`${t("publish.confirm.author.label")} *`} mt="1rem">
          <Input
            isRequired
            onChange={(e) => setAuthor(e.target.value)}
            placeholder={t("publish.confirm.author.placeholder")}
            maxLength={40}
            color="white"
            _placeholder={{ color: "inherit" }}
          />
        </Field>

        <WarningBox my={6} fontSize="0.9rem">
          {t("publish.confirm.warning")}
        </WarningBox>

        <Flex borderRadius="sm" px={6} py={6} layerStyle="glassModal">
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
              {/* 
              TODO: fix this
              <Trans
                i18nKey="generator:publish.confirm.checkbox"
                components={{
                  a: (
                    <Link
                      href={ROUTE_CGU}
                      textDecoration="underline"
                      color="new.2"
                      isExternal
                    />
                  ),
                }}
              /> */}
            </Text>
          </Flex>
        </Flex>
        <Flex justifyContent="flex-end" pt={4}>
          <Button
            isLoading={isLoading}
            isDisabled={!isChecked || author === ""}
            onClick={onSubmit}
            fontSize="1rem"
            height="3.5rem"
            layerColors={["new.1", "new.4", "new.3"]}
            color="white"
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

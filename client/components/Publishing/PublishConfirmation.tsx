import React, { useState } from "react";
import Modal from "~components/Modal";
import { Flex, Text, Checkbox, Button } from "@chakra-ui/react";
import { useTranslation, Trans } from "next-i18next";
import Link from "~components/Link";
import PublishedSuccess from "~components/Publishing/PublishedSuccess";
import { ROUTE_CGU } from "~constants";
import Warning from "public/assets/img/warning.svg";

interface Props {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

const WarningBox = ({ children, ...rest }) => {
  const { t } = useTranslation("common");
  return (
    <Flex
      bgColor="#ffd48a"
      borderLeft="5px solid #8a5700"
      borderRadius="5px"
      px={8}
      py={5}
      direction="column"
      {...rest}
    >
      <Flex alignItems="center" pb={2} fontSize="1.3rem">
        <Warning />
        <Text pl={2} fontWeight="bold" fontSize="1.1rem">
          {t("warning")}
        </Text>
      </Flex>
      {children}
    </Flex>
  );
};

const PublishConfirmation = ({ children, onClose, isOpen }: Props) => {
  const { t } = useTranslation("generator");
  const [isChecked, setChecked] = useState(false);
  const [isPublished, setPublished] = useState(false);

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
            isDisabled={!isChecked}
            onClick={() => {
              setPublished(true);
              onClose();
            }}
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

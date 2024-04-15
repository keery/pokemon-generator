import React from "react";
import { useTranslations } from "next-intl";
import { Heading, Text, Link, Container, Box, VStack } from "@chakra-ui/react";

export const Article = ({ title, description }) => {
  return (
    <Box>
      <Heading
        as="h2"
        fontSize="1.8rem"
        color="white"
        fontWeight="800"
        fontFamily="title"
        mb={2}
      >
        {title}
      </Heading>
      <Text whiteSpace="break-spaces">{description}</Text>
    </Box>
  );
};

export default function CGU() {
  const t = useTranslations("cgu");

  return (
    <Container pb={8} mt={8} color="white" pos="relative">
      <VStack spacing={6} alignItems="flex-start">
        <Box>
          <Heading as="h1" fontWeight="800" fontFamily="title" color="white">
            {t("title")}
          </Heading>
          <Text fontSize="xs" mb="1rem">
            {t("update", { date: "27/10/2022" })}
          </Text>
          <Text>{t("line1")}</Text>
        </Box>
        <Box>
          <Heading
            as="h2"
            fontWeight="800"
            fontFamily="title"
            fontSize="1.8rem"
            color="white"
          >
            {t("mention.title")}
          </Heading>
          <Text whiteSpace="break-spaces">
            {t("mention.text", { app_name: process.env.NEXT_PUBLIC_APP_NAME })}
          </Text>
          <Text mt={2}>
            {t("mention.line1", {
              app_name: process.env.NEXT_PUBLIC_APP_NAME,
              name: process.env.NEXT_PUBLIC_OWNER_NAME,
            })}
          </Text>
          <Text>
            {`${t("mention.email")}: `}
            <Link
              color="new.1"
              href={`mailto:${process.env.NEXT_PUBLIC_OWNER_EMAIL}`}
            >
              {process.env.NEXT_PUBLIC_OWNER_EMAIL}
            </Link>
          </Text>
          <Text mt={2}>
            {t("mention.host", {
              app_name: process.env.NEXT_PUBLIC_APP_NAME,
              host: "OVH SAS",
            })}
          </Text>
        </Box>
        <Article
          title={t("art1.title")}
          description={t("art1.text", {
            app_name: process.env.NEXT_PUBLIC_APP_NAME,
          })}
        />
        <Article
          title={t("art2.title")}
          description={t("art2.text", {
            email: process.env.NEXT_PUBLIC_OWNER_EMAIL,
          })}
        />
        <Article title={t("art3.title")} description={t("art3.text")} />
        <Article title={t("art4.title")} description={t("art4.text")} />
        <Article title={t("art5.title")} description={t("art5.text")} />
        <Article
          title={t("art6.title")}
          description={t("art6.text", {
            app_name: process.env.NEXT_PUBLIC_APP_NAME,
            url: process.env.NEXT_PUBLIC_PRODUCTION_URL,
          })}
        />
        <Article
          title={t("art7.title")}
          description={t("art7.text", {
            url: process.env.NEXT_PUBLIC_PRODUCTION_URL,
            app_name: process.env.NEXT_PUBLIC_APP_NAME,
          })}
        />
        <Article
          title={t("art8.title")}
          description={t("art8.text", {
            url: process.env.NEXT_PUBLIC_PRODUCTION_URL,
          })}
        />
      </VStack>
    </Container>
  );
}

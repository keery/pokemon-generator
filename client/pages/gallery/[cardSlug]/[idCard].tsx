import React, { useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { SSRConfig } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

const Card: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(
      `/gallery/?cardSlug=${router.query?.cardSlug}&idCard=${router.query?.idCard}`,
      `/gallery/${router.query?.cardSlug}/${router.query?.idCard}`,
      { shallow: true }
    );
  }, [router.query?.idCard]);

  return <></>;
};

export const getServerSideProps: GetServerSideProps<SSRConfig> = async ({
  locale,
}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "gallery"])),
    },
  };
};

export default Card;

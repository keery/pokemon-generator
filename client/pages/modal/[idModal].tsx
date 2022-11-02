import React, { useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { SSRConfig } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

const Modal: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(
      `/?modal=${router.query?.idModal}`,
      `/modal/${router.query?.idModal}`,
      { shallow: true }
    );
  }, [router.query?.idModal]);

  return <></>;
};

export const getServerSideProps: GetServerSideProps<SSRConfig> = async ({
  locale,
}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "generator"])),
    },
  };
};

export default Modal;

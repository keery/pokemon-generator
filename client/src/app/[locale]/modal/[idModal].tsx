import React, { useEffect } from "react";
import { NextPage } from "next";
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

export default Modal;

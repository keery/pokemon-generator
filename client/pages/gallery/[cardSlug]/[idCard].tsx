import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { SSRConfig } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Router from "next/router";
import { getCard } from "~hooks/useCard";
import { ROUTE_404 } from "~constants";
import { cardModalAtom } from "~atoms/card-modal";
import { useSetRecoilState } from "recoil";
import { NextSeo } from "next-seo";

const Card = ({ card }) => {
  const setCard = useSetRecoilState(cardModalAtom);

  useEffect(() => {
    setCard({ card });
  }, []);

  useEffect(() => {
    Router.push(
      `/gallery/?cardSlug=${card.slug}&idCard=${card.id}`,
      `/gallery/${card.slug}/${card.id}`,
      { shallow: true }
    );
  }, [card.id]);

  return (
    <>
      <NextSeo
        title="Simple Usage Example"
        description="A short description goes here."
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<SSRConfig> = async ({
  locale,
  query,
}) => {
  try {
    const card = await getCard(query.idCard as string);

    return {
      props: {
        ...(await serverSideTranslations(locale, ["common", "gallery"])),
        card,
      },
    };
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: ROUTE_404,
      },
    };
  }
};

export default Card;

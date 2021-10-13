import React from "react";
import NextHead from "next/head";
import { useTranslation } from "next-i18next";
import { DefaultSeo } from "next-seo";

const NAME = "Pokemon Generator";

const AppHead = () => {
  const { t } = useTranslation();
  return (
    <>
      <NextHead>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/assets/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/assets/favicon/safari-pinned-tab.svg"
          color="#373373"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </NextHead>
      <DefaultSeo
        titleTemplate={`%s | ${NAME}`}
        defaultTitle={t("seo.title")}
        description={t("seo.description")}
        openGraph={{
          type: "website",
          url: process.env.NEXT_PUBLIC_URL,
          site_name: NAME,
          images: [
            {
              url: process.env.NEXT_PUBLIC_URL + "/assets/img/og-cover.png",
              width: 300,
              height: 169,
              alt: `${NAME} logo`,
            },
          ],
        }}
        twitter={{
          handle: NAME.toLowerCase(),
          site: process.env.NEXT_PUBLIC_URL,
          cardType: "summary_large_image",
        }}
      />
    </>
  );
};

export default AppHead;

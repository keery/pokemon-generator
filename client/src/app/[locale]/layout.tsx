import type { Metadata } from "next";
import React from "react";

import AppHead from "~components/AppHead";
import Layout from "~components/Layout";
import { NextIntlClientProvider, useMessages } from "next-intl";

import { Providers } from "./providers";
import { locales } from "~src/locales";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/drag-drop/dist/style.css";
import "swiper/css";
import "swiper/css/navigation";
import "../../../styles/globals.css";

//TODO: update this
export const metadata: Metadata = {
  title: "Think HQ exercice",
  description: "Think HQ exercice",
};

export async function generateStaticParams() {
  return locales.map((lng) => ({ lng }));
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}) {
  const messages = useMessages();

  return (
    <html lang={lng}>
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-63N1ZFYVNM"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'G-63N1ZFYVNM');
          `,
          }}
        />
      </head>
      <body>
        {/* 
        TODO: migrate this
        <AppHead /> */}
        <NextIntlClientProvider locale={lng} messages={messages}>
          <Providers>
            <Layout>{children}</Layout>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

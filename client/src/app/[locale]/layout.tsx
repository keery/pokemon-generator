import type { Metadata } from "next";
import React from "react";

import AppHead from "~src/components/AppHead";
import Layout from "~src/components/Layout";
import { NextIntlClientProvider, useMessages } from "next-intl";

import { Providers } from "./providers";

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

export default function RootLayout({
  test,
  children,
  params: { locale },
}: Readonly<{
  test: React.ReactNode;
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = useMessages();

  return (
    <html lang={locale}>
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
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers locale={locale}>
            <Layout>
              <div>{test}</div>
              {children}
            </Layout>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

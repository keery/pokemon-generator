import React from "react";
import NextErrorPage from "next/error";
import { NextPage } from "next";

const ErrorPage: NextPage<{ statusCode: number }> = ({
  statusCode,
}: {
  statusCode: number;
}) => {
  localStorage.removeItem(process.env.NEXT_PUBLIC_KEY_CACHE);
  return <NextErrorPage statusCode={statusCode} />;
};

ErrorPage.getInitialProps = async (ctx) => {
  return NextErrorPage.getInitialProps(ctx);
};

export default ErrorPage;

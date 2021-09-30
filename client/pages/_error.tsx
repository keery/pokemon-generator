import React from 'react'
import NextErrorPage from 'next/error'
import { NextPage } from 'next'

const ErrorPage: NextPage<{ statusCode: number }> = ({
  statusCode,
}: {
  statusCode: number
}) => {
  return <NextErrorPage statusCode={statusCode} />
}

ErrorPage.getInitialProps = async (ctx) => {
  return NextErrorPage.getInitialProps(ctx)
}

export default ErrorPage

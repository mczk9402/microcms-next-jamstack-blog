import Head from 'next/head';
import Script from 'next/script';
import React, { VFC } from 'react';

interface Props {
  pageTitle: string;
}

export const Seo: VFC<Props> = ({ pageTitle }) => {
  const defaultTitle = 'テストブログ';
  const title = pageTitle ? `${pageTitle} | ${defaultTitle}` : defaultTitle;

  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );
};

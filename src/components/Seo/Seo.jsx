import Head from 'next/head';
import React from 'react';

export const Seo = ({ pageTitle }) => {
  const defaultTitle = 'テストブログ';
  const title = pageTitle ? `${pageTitle} | ${defaultTitle}` : defaultTitle;

  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );
};

import { Header } from 'components/Header';
import { MainVisual } from 'components/MainVisual';
import { Seo } from 'components/Seo';
import React, { VFC } from 'react';

interface Props {
  pageTitle?: string;
  mainVisual?: {};
  children: any;
}

export const Layout: VFC<Props> = ({ children, mainVisual, pageTitle }) => {
  return (
    <>
      <Seo pageTitle={pageTitle} />
      <Header />
      <div className="py-[64px]">
        {mainVisual ? <MainVisual mainVisual={mainVisual} /> : null}
        <main className="relative">
          <div
            className={`${
              mainVisual
                ? 'mt-[-240px] w-screen h-[240px] bg-gradient-to-t from-white to-transparent'
                : 'pt-[64px]'
            }`}
          ></div>
          <div className="bg-white">
            <div className="mx-auto max-w-[620px]">{children}</div>
          </div>
        </main>
      </div>
    </>
  );
};

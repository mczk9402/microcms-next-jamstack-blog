import { HeaderModal } from 'components/HeaderModal';
import { client } from 'pages/api/client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, VFC } from 'react';
import { useState } from 'react';
import { GlobalContext } from 'context/global';

export const Header: VFC = () => {
  const [open, setOpen] = useState(false);
  const {
    globalState: { siteInfo },
    setGlobalState,
  } = useContext(GlobalContext);

  useEffect(() => {
    if (!siteInfo.profileImage.url) {
      client
        .get({
          endpoint: 'site-info',
          contentId: '6261l8lvlwwa',
        })
        .then((res) => {
          setGlobalState({ type: 'SET_SITE_INFO', payload: { siteInfo: res } });
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className="fixed top-0 z-10 w-screen h-[64px] bg-black/[0.85]">
      <div className="flex justify-between items-center mx-auto max-w-[960px] h-full text-white">
        <Link href="/">
          <a className="grid relative grid-flow-col gap-[16px] items-center">
            {siteInfo.profileImage.url ? (
              <Image
                src={siteInfo.profileImage.url}
                className="rounded-full"
                alt=""
                width="32"
                height="32"
                layout="fixed"
                objectFit="cover"
              />
            ) : null}
            <span>{siteInfo.title}</span>
          </a>
        </Link>
        <button
          className="flex justify-center items-center w-[64px] h-full border-r border-l border-[#585858]"
          onClick={() => setOpen(!open)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      <HeaderModal open={open} setOpen={setOpen} />
    </header>
  );
};

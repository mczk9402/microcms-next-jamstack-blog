import { HeaderModal } from 'components/HeaderModal';
import { client } from 'pages/api/client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [siteInfo, setSiteInfo] = useState({});
  const getSiteInfo = async () => {
    const siteInfo = await client.get({
      endpoint: 'site-info',
      contentId: '6261l8lvlwwa',
    });
    setSiteInfo(siteInfo);
  };

  useEffect(() => {
    getSiteInfo();
  }, []);

  return (
    <header className="fixed top-0 z-10 w-screen h-[64px] bg-black/[0.85]">
      <div className="flex justify-between items-center mx-auto max-w-[960px] h-full text-white">
        <Link href="/">
          <a className="grid grid-flow-col gap-[16px] items-center">
            {siteInfo.profileImage ? (
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

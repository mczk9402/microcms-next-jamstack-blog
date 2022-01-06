import Image from 'next/image';
import Link from 'next/link';
import React, { VFC } from 'react';

interface CurrentArticle {
  body: string;
  category?: string;
  createdAt: string;
  dev?: string;
  dev2?: {
    url: string;
    height: number;
    width: number;
  };
  dev3?: string;
  fieldId: string;
  eyecatch?: {
    height: 0;
    url: string;
    width: 0;
  };
  id: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  updatedAt: string;
}

export const ArchiveList: VFC<any> = ({ archives }) => {
  return (
    <ul>
      {archives.map((archive: CurrentArticle, index: React.Key) => (
        <li className="border-b border-[#ccc]" key={index}>
          <Link href={`/blogs/${archive.id}`}>
            <a className="flex justify-between py-[16px]">
              <div className="grid gap-[16px] content-between">
                <p>{archive.title}</p>
                <p>{archive.updatedAt}</p>
              </div>
              <div className="relative w-[165px] h-[165px]">
                <Image
                  src={archive.eyecatch ? archive.eyecatch.url : '/no-image.png'}
                  className="rounded-[8px]"
                  alt=""
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

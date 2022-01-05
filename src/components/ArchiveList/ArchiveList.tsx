import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const ArchiveList = ({ archives }) => {
  return (
    <ul>
      {archives.map((archive, index) => (
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

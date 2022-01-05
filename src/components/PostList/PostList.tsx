import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const PostList = ({ blog }) => {
  return (
    <ul className="grid grid-cols-2 gap-[16px] items-start">
      {blog.map((blog, index) => (
        <li
          className={`${index === 0 ? 'h-[557px] col-span-full' : ''}${
            index > 4 ? 'col-span-full' : ''
          }${index === 1 || index === 4 ? 'h-[557px]' : ''}${
            index === 2 || index === 3 ? 'h-[463px]' : ''
          } ${index === 4 ? 'mt-[-94px]' : ''} text-[16px]`}
          key={index}
        >
          <Link href={`/blogs/${blog.id}`}>
            <a
              className={`${
                index > 4 ? 'grid-flow-col justify-between py-[16px] border-t border-[#ccc]' : ''
              } grid overflow-hidden items-end h-full rounded-[8px]`}
            >
              <div
                className={`${
                  index < 5
                    ? 'col-span-full row-span-full h-full'
                    : 'w-[164px] h-[164px] order-last'
                } relative`}
              >
                <Image
                  src={blog.eyecatch ? blog.eyecatch.url : '/no-image.png'}
                  className="rounded-[8px]"
                  alt=""
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div
                className={`${
                  index < 5
                    ? 'px-[20px] pt-[64px] pb-[28px] bg-gradient-to-t from-black to-transparent text-white col-span-full row-span-full'
                    : 'content-between h-full'
                } grid relative gap-[16px] font-bold`}
              >
                <span className={'text-[22px]'}>{blog.title}</span>
                <span className={'text-[12px]'}>{blog.publishedAt}</span>
              </div>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

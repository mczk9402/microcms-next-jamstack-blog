import React from 'react';
import { Client } from '@notionhq/client';
import Image from 'next/image';
import useSWR from 'swr';

const Notion = ({ post, info }: any) => {
  const dotsStyle =
    'repeating-linear-gradient(0deg,rgba(242,242,242,0.25) 0px 1px, transparent 1px 2px),repeating-linear-gradient(90deg,rgba(242,242,242,0.25) 0px 1px, transparent 1px 2px)';

  return (
    <div>
      <div className="grid relative justify-center items-center w-full h-[316px] bg-[#111]/[0.25]">
        {info.cover ? (
          <Image
            src={info.cover.external.url}
            alt="メインビジュアル"
            objectFit="cover"
            layout="fill"
          />
        ) : null}
        <div
          className="absolute top-0 left-0 w-full h-full bg-[#111]/[0.25]"
          style={{ backgroundImage: dotsStyle }}
        ></div>
        <div className="grid relative justify-items-center text-[#fff]">
          <h1 className="text-[50px] font-bold">{info.properties.title.title[0].plain_text}</h1>
          <div className="grid grid-flow-col gap-[16px]">
            {[
              { label: '作成日', text: info.created_time },
              { label: '更新日', text: info.last_edited_time },
            ].map((item, index) => (
              <span className="text-[14px] font-bold" key={index}>
                {item.label} : {item.text}
              </span>
            ))}
          </div>
        </div>
      </div>
      <article className="grid gap-[16px] py-[64px] mx-auto max-w-[620px]">
        {post.map((block: any, blockIndex: number) => {
          switch (block.type) {
            case 'heading_1':
              return (
                <h1 className="text-[40px] font-bold" key={blockIndex}>
                  {block.heading_1.text[0]?.plain_text || null}
                </h1>
              );
            case 'heading_2':
              return (
                <h2 className="text-[36px] font-bold" key={blockIndex}>
                  {block.heading_2.text[0]?.plain_text || null}
                </h2>
              );
            case 'heading_3':
              return (
                <h3 className="text-[32px] font-bold" key={blockIndex}>
                  {block.heading_3.text[0]?.plain_text || null}
                </h3>
              );
            case 'heading_4':
              return (
                <h4 className="text-[28px] font-bold" key={blockIndex}>
                  {block.heading_4.text[0]?.plain_text || null}
                </h4>
              );
            case 'heading_5':
              return (
                <h5 className="text-[24px] font-bold" key={blockIndex}>
                  {block.heading_5.text[0]?.plain_text || null}
                </h5>
              );
            case 'heading_6':
              return (
                <h6 className="text-[20px] font-bold" key={blockIndex}>
                  {block.heading_6.text[0]?.plain_text || null}
                </h6>
              );
            case 'paragraph':
              return (
                <p className="text-[18px]" key={blockIndex}>
                  {block.paragraph.text.map((item: any, textIndex: number) => {
                    let classes = [''];

                    if (item.annotations.bold) {
                      classes = [...classes, 'font-bold'];
                    }
                    if (item.annotations.code) {
                      classes = [...classes, 'bg-[#222] p-[8px] text-[#fff]'];
                    }
                    if (item.annotations.italic) {
                      classes = [...classes, 'italic'];
                    }
                    if (item.annotations.strikethrough) {
                      classes = [...classes, 'line-through'];
                    }
                    if (item.annotations.underline) {
                      classes = [...classes, 'underline'];
                    }

                    return (
                      <span
                        className={classes.join(' ')}
                        style={{
                          color: item.annotations.color,
                        }}
                        key={textIndex}
                      >
                        {item.plain_text}
                      </span>
                    );
                  })}
                </p>
              );
            case 'code':
              return (
                <code className="p-[8px] text-[18px] text-[#fff] bg-[#222]" key={blockIndex}>
                  {block.code.text[0].plain_text}
                </code>
              );
            case 'image':
              return (
                <div className="relative" key={blockIndex}>
                  <Image src={block.image.file.url} alt={''} objectFit="cover" layout="fill" />
                  <div className="pb-[56.25%]"></div>
                </div>
              );
            case 'column_list':
              return (
                <p className="text-[18px]" key={blockIndex}>
                  複数カラムは非対応です
                </p>
              );
            default:
              return (
                <p className="text-[18px]" key={blockIndex}>
                  非対応のブロックです
                </p>
              );
          }
        })}
      </article>
    </div>
  );
};

export default Notion;

// https://zenn.dev/5t111111/articles/80934cdda55328
// export const getStaticProps = async () => {
//   const notion = new Client({
//     auth: process.env.NOTION_TOKEN,
//   });

//   const pageInfo = await notion.pages.retrieve({
//     page_id: process.env.NOTION_PAGE_ID as string,
//   });

//   const blocks = await notion.blocks.children.list({
//     block_id: process.env.NOTION_PAGE_ID as string,
//   });

//   console.log(process.env.NOTION_TOKEN);

//   return {
//     props: {
//       info: pageInfo,
//       post: blocks.results,
//     },
//   };
// };

export const getServerSideProps = async () => {
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });

  const pageInfo = await notion.pages.retrieve({
    page_id: process.env.NOTION_PAGE_ID as string,
  });

  const blocks = await notion.blocks.children.list({
    block_id: process.env.NOTION_PAGE_ID as string,
  });

  console.log(process.env.NOTION_TOKEN);

  return {
    props: {
      info: pageInfo,
      post: blocks.results,
    },
  };
};

// pages/blog/[id].js
import { Heading1 } from 'components/Heading';
import { Layout } from 'components/Layout';
import { client } from 'pages/api/client';
import Link from 'next/link';
import Image from 'next/image';

export default function BlogId({ blog, prev, next }) {
  console.log(blog);
  return (
    <Layout mainVisual={blog.eyecatch}>
      <Heading1 title={blog.title} description={blog.publishedAt} />
      <p>{blog.category ? `${blog.category.categoryName}` : null}</p>
      <article
        dangerouslySetInnerHTML={{
          __html: `${blog.body ? blog.body : ''}`,
        }}
      />
      {blog.dev ? (
        <div className="grid grid-cols-[1fr_160px] gap-[16px]">
          <div className="grid gap-[16px] content-between">
            <span>{blog.dev.dev}</span>
            <span>{blog.dev.dev3}</span>
          </div>
          <div className="relative pb-[100%]">
            <Image src={blog.dev.dev2.url} layout="fill" objectFit="cover" alt={blog.dev.dev} />
          </div>
        </div>
      ) : (
        ''
      )}
      {next ? (
        <Link href={`/blogs/${next.id}`}>
          <a>次の記事</a>
        </Link>
      ) : null}
      {prev ? (
        <Link href={`/blogs/${prev.id}`}>
          <a>前の記事</a>
        </Link>
      ) : null}
    </Layout>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: 'test' });
  const paths = data.contents.map((content) => `/blogs/${content.id}`);

  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({
    endpoint: 'test',
    contentId: id,
  });

  // 一つ前 / 一つ後ろのコンテンツはどのように取得すれば良いですか？
  // http://help.microcms.io/ja/knowledge/get-previous-or-next
  const otherArticle = await client.get({
    endpoint: 'test',
    queries: {
      limit: 100,
      fields: 'id,title',
    },
  });

  const articleIndex = otherArticle.contents.findIndex((content) => content.id === data.id);
  const prev = otherArticle.contents[articleIndex + 1];
  const next = otherArticle.contents[articleIndex - 1];

  const siteInfo = await client.get({
    endpoint: 'site-info',
    contentId: '6261l8lvlwwa',
  });

  return {
    props: {
      blog: data,
      totalCount: otherArticle.totalCount,
      articleIndex,
      prev: prev ? prev : null,
      next: next ? next : null,
      siteInfo,
    },
  };
};

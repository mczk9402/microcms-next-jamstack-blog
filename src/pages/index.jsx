import Head from 'next/head';
import { client } from 'pages/api/client';
import { PostList } from 'components/PostList';
import { Pagination } from 'components/Pagination';
import { Layout } from 'components/Layout';
import { Heading1, Heading2 } from 'components/Heading';

export default function Home({ blog, totalCount, siteInfo }) {
  console.log(blog, totalCount, siteInfo);
  const { title, description, mainVisual } = siteInfo;
  // slice(どこから,どこまで)を返す
  const latestBlog = blog.slice(0, 8);

  return (
    <Layout mainVisual={mainVisual}>
      <Heading1 title={title} description={description} />
      <Heading2 title={'記事一覧'} />
      <PostList blog={latestBlog} />
      <Pagination totalCount={totalCount} />
    </Layout>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({
    endpoint: 'test',
    queries: {
      offset: 0,
      limit: 100,
    },
  });

  const siteInfo = await client.get({
    endpoint: 'site-info',
    contentId: '6261l8lvlwwa',
  });

  const hoge = await client.get({
    endpoint: 'hoge',
    queries: {
      depth: 3,
    },
  });

  return {
    props: {
      blog: data.contents,
      totalCount: data.totalCount,
      siteInfo: siteInfo,
      hoge,
    },
  };
};

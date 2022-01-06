// pages/blog/[id].js
import { ArchiveList } from 'components/ArchiveList';
import { Heading1 } from 'components/Heading';
import { Layout } from 'components/Layout';
import { Pagination } from 'components/Pagination';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { Params } from 'next/dist/server/router';
import { client } from 'pages/api/client';
import { TestContent } from 'Types/TestContent';
import { TypeOf } from 'yup';

interface Props {
  blog: TestContent[];
  totalCount: number;
  currentPage: number;
}

// https://ji23-dev.com/blogs/next-jamstack-paging
const Archive: NextPage<Props> = ({ blog, totalCount, currentPage }) => {
  const currentArticles = blog.slice(-10 + 10 * currentPage, 0 + 10 * currentPage);

  return (
    <Layout pageTitle={`アーカイブ - ${currentPage}ページ`}>
      <Heading1 title={'アーカイブ'} description={'過去の記事一覧'} />
      <ArchiveList archives={currentArticles} />
      <Pagination totalCount={totalCount} currentPage={currentPage} />
    </Layout>
  );
};
export default Archive;

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: 'test' });
  const paths = [...Array(Math.ceil(data.totalCount / data.limit))]
    .map((_, i) => i + 1)
    .map((offset) => `/archives/${offset}`);

  return { paths, fallback: false };
};

interface Props {
  params: {
    page: string;
  };
}

// type Props = InferGetStaticPropsType<typeof getStaticProps>;

// : GetStaticProps<Props>
// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async ({ params }: Props) => {
  const data = await client.get({
    endpoint: 'test',
    queries: {
      limit: 100,
    },
  });

  return {
    props: {
      blog: data.contents,
      totalCount: data.totalCount,
      currentPage: parseInt(params?.page),
    },
  };
};

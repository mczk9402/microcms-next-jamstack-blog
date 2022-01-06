import { Button } from '@chakra-ui/react';
import { Heading1 } from 'components/Heading';
import { Layout } from 'components/Layout';
import { NextPage } from 'next';
import Link from 'next/link';
import React, { useState } from 'react';
import { client } from './api/client';

interface Props {
  categories: {
    name: string;
  }[];
  blogs: {
    id: string;
    title: string;
    category: {
      createdAt: string;
      id: string;
      name: string;
      publishedAt: string;
      revisedAt: string;
      updatedAt: string;
    };
  }[];
}

const CategoryList: NextPage<Props> = ({ categories, blogs }) => {
  const [currentCategory, setCurrentCategory] = useState('');
  const title = currentCategory === '' ? 'カテゴリー' : currentCategory;
  console.log(blogs);

  return (
    <Layout>
      <Heading1 title={`${title}一覧`} description={'カテゴリーを選択してください'} />
      <ul className="flex gap-[4px]">
        {categories.map((category, index) => (
          <li key={index}>
            <Button
              colorScheme="teal"
              variant={category.name === currentCategory ? 'solid' : 'outline'}
              onClick={() => setCurrentCategory(category.name)}
            >
              {category.name}
            </Button>
          </li>
        ))}
      </ul>
      <ul className="mt-[32px]">
        {blogs.map((blog, index) =>
          blog.category?.name === currentCategory ? (
            <li className="border-t border-black first:border-none" key={index}>
              <Link href={`/blogs/${blog.id}`}>
                <a className="block py-[16px]">{blog.title}</a>
              </Link>
            </li>
          ) : null
        )}
      </ul>
    </Layout>
  );
};

export default CategoryList;

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const categories = await client.get({
    endpoint: 'categories',
    queries: {
      offset: 0,
      limit: 100,
      fields: 'name',
    },
  });

  const blogs = await client.get({
    endpoint: 'test',
    queries: {
      offset: 0,
      limit: 100,
      fields: 'id,title,category,',
    },
  });

  return {
    props: {
      categories: categories.contents,
      blogs: blogs.contents,
    },
  };
};

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Input, Textarea, Button } from '@chakra-ui/react';
import { Layout } from 'components/Layout';
import { Heading1 } from 'components/Heading';
import { useForm } from 'react-hook-form';
import { InputWrapper } from 'components/InputWrapper';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';
import axios from 'axios';

// 【Formik/Yup】React簡単フォーム作成ライブラリ解説
// https://suwaru.tokyo/%E3%80%90formik-yup%E3%80%91react%E7%B0%A1%E5%8D%98%E3%83%95%E3%82%A9%E3%83%BC%E3%83%A0%E4%BD%9C%E6%88%90%E3%83%A9%E3%82%A4%E3%83%96%E3%83%A9%E3%83%AA%E8%A7%A3%E8%AA%AC/
const schema = yup.object({
  name: yup.string().required('氏名は必須です'),
  email: yup
    .string()
    .email('メールアドレスの形式に誤りがあります')
    .required('メールアドレスは必須です'),
  body: yup.string().required('お問い合わせ内容は必須です'),
});

const Contact = () => {
  const [confirm, setConfirm] = useState(false);
  const [complete, setComplete] = useState(false);
  const [contact, setContact] = useState({});

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: contact.name,
      email: contact.email,
      body: contact.body,
    },
  });

  const onSubmit = async (data) => {
    setConfirm(true);
    setContact(data);
  };

  const onComplete = async () => {
    await axios.post('https://mczk9402.microcms.io/api/v1/contact', contact, {
      headers: {
        'Content-Type': 'application/json',
        'X-MICROCMS-API-KEY': process.env.NEXT_PUBLIC_API_KEY,
      },
    });
  };

  const [rows, setRows] = useState(5);
  const [height, setHeight] = useState(0);

  const handleTextArea = (e) => {
    console.log(e.target.scrollHeight, e.target.offsetHeight);
    setHeight(e.target.scrollHeight);
  };

  if (complete) {
    return (
      <Layout pageTitle="お問い合わせ完了">
        <Heading1 title={'お問い合わせ完了'} description={'お問い合わせが完了しました'} />
        <div className="flex justify-center">
          <Link href="/">
            <a>
              <Button type="submit" colorScheme="blue" size="lg">
                TOPへ
              </Button>
            </a>
          </Link>
        </div>
      </Layout>
    );
  }

  if (confirm) {
    console.log(contact);
    return (
      <Layout pageTitle="お問い合わせ確認">
        <Heading1 title={'お問い合わせ確認'} description={'お問い合わせ内容の確認です'} />
        <div className="grid gap-[16px]">
          <div className="grid gap-[8px]">
            <span className="font-bold">お名前</span>
            <span className="text-[18px] font-bold">{contact.name}</span>
          </div>
          <div className="grid gap-[8px]">
            <span className="font-bold">メールアドレス</span>
            <span className="text-[18px] font-bold">{contact.email}</span>
          </div>
          <div className="grid gap-[8px]">
            <span className="font-bold">内容</span>
            <span className="max-w-full text-[18px] font-bold break-all">{contact.body}</span>
          </div>
        </div>
        <div className="grid gap-[16px] mt-[32px]">
          <Button
            colorScheme="blue"
            size="lg"
            onClick={() => {
              setComplete(true);
              setConfirm(false);
              onComplete();
            }}
          >
            送信する
          </Button>
          <Button
            colorScheme="blue"
            variant="outline"
            size="lg"
            onClick={() => {
              setConfirm(false);
            }}
          >
            変更する
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout pageTitle="お問い合わせ">
      <Heading1 title={'お問い合わせ'} description={'お気軽にお問い合わせください'} />
      <form className="grid gap-[16px]" onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper label="お名前">
          <Input variant="filled" placeholder="お名前" {...register('name')} />
          {errors.name && (
            <span className="text-[14px] font-bold text-red-500">{errors.name.message}</span>
          )}
        </InputWrapper>
        <InputWrapper label="メールアドレス">
          <Input variant="filled" placeholder="メールアドレス" {...register('email')} />
          {errors.email && (
            <span className="text-[14px] font-bold text-red-500">{errors.email.message}</span>
          )}
        </InputWrapper>
        <InputWrapper label="本文">
          <Textarea
            variant="filled"
            placeholder="本文"
            {...register('body')}
            className="overflow-hidden pb-[12px] resize-none"
            style={{ minHeight: height + 'px' }}
            wrap="hard"
            rows="5"
            onChange={(e) => handleTextArea(e)}
          />
          {errors.body && (
            <span className="text-[14px] font-bold text-red-500">{errors.body.message}</span>
          )}
        </InputWrapper>
        <Button type="submit" colorScheme="blue" size="lg" className="mt-[16px]">
          送信する
        </Button>
      </form>
    </Layout>
  );
};

export default Contact;

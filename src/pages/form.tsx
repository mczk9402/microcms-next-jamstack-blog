import { Transition } from '@headlessui/react';
import { Button, Card, Input, Loading, Text, Textarea, useInput } from '@nextui-org/react';
import axios from 'axios';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

interface Inputs {
  block: string;
  label: string;
  placeholder: string;
  type?: string;
  inputmode?:
    | 'email'
    | 'numeric'
    | 'search'
    | 'text'
    | 'none'
    | 'tel'
    | 'url'
    | 'decimal'
    | undefined;
  pattern?: RegExp;
  autoInput?: boolean;
  textarea?: boolean;
}

const Inputs: Inputs[] = [
  {
    block: 'name',
    label: 'お名前',
    placeholder: '例：山田太郎',
  },
  {
    block: 'ruby',
    label: 'フリガナ',
    placeholder: '例：ヤマダタロウ',
    pattern: /^[\u30A0-\u30FF]+$/,
  },
  {
    block: 'email',
    label: 'メールアドレス',
    placeholder: '例：y-taro@taro.com',
    type: 'email',
    pattern: /[\w\-\._]+@[\w\-\._]+\.[A-Za-z]+/,
  },
  {
    block: 'tel',
    label: '電話番号 ※ハイフン不要',
    placeholder: '例：00012341234',
    inputmode: 'numeric',
    pattern: /^[0-9]*$/,
  },
  {
    block: 'zipcode',
    label: '郵便番号 ※ハイフン不要',
    placeholder: '例：00012341234',
    inputmode: 'numeric',
    autoInput: true,
    pattern: /^[0-9]*$/,
  },
  {
    block: 'address',
    label: '住所',
    placeholder: '例：○○県　○○市　○○町　○○住宅　1-2-3',
    pattern:
      /(...??[都道府県])((?:旭川|伊達|石狩|盛岡|奥州|田村|南相馬|那須塩原|東村山|武蔵村山|羽村|十日町|上越|富山|野々市|大町|蒲郡|四日市|姫路|大和郡山|廿日市|下松|岩国|田川|大村)市|.+?郡(?:玉村|大町|.+?)[町村]|.+?市.+?区|.+?[市区町村])(.+)/,
  },
  {
    block: 'text',
    label: 'お問い合わせ内容',
    placeholder: '○○○を相談したい。',
    textarea: true,
  },
];

const Form = () => {
  const [complete, setComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchZipcode = async () => {
    setLoading(true);
    // https://zipcloud.ibsnet.co.jp/doc/api
    axios
      .get(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${watch('zipcode', false)}`)
      .then((res) => {
        clearErrors('zipcode');
        const data = res.data.results[0];
        setValue(
          'address',
          data.address1 + '\u0020' + data.address2 + '\u0020' + data.address3 + '\u0020',
          { shouldValidate: true }
        );

        // 郵便番号で自動入力後に住所をオートフォーカスする
        // inputAddress.current.focus();
      })
      .catch((error) => {
        if (error) {
          console.log('a');

          setError('zipcode', {
            type: 'manual',
            message: '郵便番号が不明です',
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    axios.post(process.env.NEXT_PUBLIC_MICROCMS_FORM_CLIENT as string, data, {
      headers: {
        'Content-Type': 'application/json',
        'X-MICROCMS-API-KEY': process.env.NEXT_PUBLIC_MICROCMS_FORM_API_KEY as string,
      },
    });
    reset();
    setComplete(true);
  };

  // refの共有
  const inputAddress = useRef<any>(null);
  const { ref, ...rest } = register('address');

  // エラーメッセージの出し分け
  const errorMessage = (errorType: string, errorMessage: string) => {
    switch (errorType) {
      case 'required':
        return '未入力です';
      case 'pattern':
        return '入力エラーです';
      case 'manual':
        return errorMessage;
      default:
    }
  };

  if (complete) {
    return (
      <div>
        <main className="py-[64px] px-[16px] mx-auto max-w-[620px]">
          <section className="grid gap-[32px] prose-h2:my-0 prose md:prose-lg">
            <div>
              <div>
                <Text
                  h1
                  size={48}
                  css={{
                    textGradient: '45deg, $blue500 -20%, $pink500 50%',
                  }}
                  weight="bold"
                >
                  COMPLETE
                </Text>
                <h2 className="text-[15px]">お問い合わせ完了</h2>
              </div>
              <p>
                お問い合わせのご返信には、少々お時間を頂く場合がございます。
                ご了承のほどよろしくお願いいたします。
              </p>
              <Link href="/">
                <a className="no-underline">
                  <Button
                    className="mt-[32px] w-full min-w-0"
                    color="gradient"
                    size="xl"
                    type="button"
                  >
                    <span className="font-bold">TOPに戻る</span>
                  </Button>
                </a>
              </Link>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div>
      <main className="py-[64px] px-[16px] mx-auto max-w-[620px]">
        <section className="grid gap-[32px] prose-h2:my-0 prose md:prose-lg">
          <div>
            <div>
              <Text
                h1
                size={48}
                css={{
                  textGradient: '45deg, $blue500 -20%, $pink500 50%',
                }}
                weight="bold"
              >
                CONTACT
              </Text>
              <h2 className="text-[15px]">お問い合わせフォーム</h2>
            </div>
            <p>
              お問い合わせのご返信には、少々お時間を頂く場合がございます。
              ご了承のほどよろしくお願いいたします。
            </p>
            <Text small weight="bold" color="error">
              ※入力はすべて必須となります。
            </Text>
          </div>

          <form className="grid gap-[24px]" onSubmit={handleSubmit(onSubmit)} noValidate>
            {Inputs.map((input, index) => {
              const options = {
                status: errors[input.block] && 'error',
                label: input.label,
                placeholder: input.placeholder,
                size: 'lg' as 'lg',
                type: input.type ? input.type : undefined,
                inputMode: input.inputmode ? input.inputmode : undefined,
                animated: false,
                shadow: false,
                ...register(input.block, {
                  required: '未入力です',
                  pattern: input.pattern,
                }),
              };

              return (
                <div className="grid relative grid-cols-[1fr_max-content] items-end" key={index}>
                  <div className="grid relative grid-cols-1">
                    {!input.textarea ? (
                      <Input {...options} />
                    ) : (
                      <Textarea {...options} minRows={50} />
                    )}
                    <Transition
                      className="absolute top-full row-start-2 px-[4px] pt-[4px]"
                      show={errors[input.block] ? true : false}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 translate-y-1 sm:translate-y-0 sm:scale-95"
                      enterTo="opacity-100 translate-y-0 sm:scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                      leaveTo="opacity-0 translate-y-1 sm:translate-y-0 sm:scale-95"
                    >
                      <Text size={12} weight="bold" color="error">
                        {errorMessage(errors?.[input.block]?.type, errors?.[input.block]?.message)}
                      </Text>
                    </Transition>
                  </div>
                  {input.autoInput && (
                    <Button
                      className="relative ml-[8px] min-w-0"
                      color="gradient"
                      size="lg"
                      type="button"
                      onClick={fetchZipcode}
                    >
                      <span
                        className={`${
                          loading ? 'opacity-0' : 'opacity-100'
                        } font-bold duration-200 transition-opacity`}
                      >
                        自動入力
                      </span>

                      <Loading
                        className={`${
                          loading ? 'opacity-100' : 'opacity-0'
                        } absolute duration-200 transition-opacity`}
                        size="sm"
                        color="success"
                      />
                    </Button>
                  )}
                </div>
              );
            })}
            <Button className="mt-[24px] min-w-0" color="gradient" size="xl">
              <span className="font-bold">送信する</span>
            </Button>
            <button className="underline" onClick={() => reset()} type="button">
              全てリセットする
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Form;

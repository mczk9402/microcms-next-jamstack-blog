import next, { NextPage } from 'next';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Controller,
  EffectFade,
  Autoplay,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
SwiperCore.use([Navigation, EffectFade, Autoplay]);

// Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import { Layout } from 'components/Layout';
// import 'slick-carousel/slick/slick-theme.css';

interface Props {
  data:
    | {
        contents: {
          image: {
            height: number;
            url: string;
            width: number;
          };
        }[];
        limit: number;
        offset: number;
        totalCount: number;
      }
    | undefined;
}

export const Presenter: NextPage<Props> = ({ data }) => {
  // https://react-slick.neostack.com/
  // https://codesandbox.io/s/custom-dots-react-slick-pl27t?file=/src/index.js
  const customeSlider: any = useRef();
  const prev = () => customeSlider.current.slickPrev();
  const next = () => customeSlider.current.slickNext();
  const goTo = (i: number) => customeSlider.current.slickGoTo(i);
  const [currentIndex, setCurrentIndex] = useState(0);

  const settings = {
    dots: true,
    dotsClass: 'grid grid-flow-col gap-[4px] justify-center absolute bottom-0 py-[16px] w-full ',
    customPaging: (index: number) => (
      <button
        className={`${
          index === currentIndex ? 'bg-white' : 'bg-white/50'
        } w-[8px] h-[8px] rounded-full`}
        onClick={() => goTo(index)}
      ></button>
    ),
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1000,
    fade: true,
    arrows: false,
    beforeChange: (oldIndex: number, newIndex: number) => setCurrentIndex(newIndex),
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const buttonCommonStyle =
    'w-[60px] h-[60px] bg-black flex items-center justify-center text-white font-bold absolute z-50 top-[50%] translate-y-[-50%]';

  return (
    <Layout>
      <div className="relative">
        <button className={`${buttonCommonStyle} left-0`} onClick={prev}>
          ＜
        </button>
        <button className={`${buttonCommonStyle} right-0`} onClick={next}>
          ＞
        </button>
        <Slider className="overflow-hidden" ref={customeSlider} {...settings}>
          {data
            ? data.contents.map((item, index) => (
                <div key={index} className="relative">
                  <Image src={item.image.url} alt="" layout="fill" objectFit="cover" />
                  <div className="pb-[56.25%]"></div>
                </div>
              ))
            : null}
        </Slider>
      </div>
    </Layout>
  );
};

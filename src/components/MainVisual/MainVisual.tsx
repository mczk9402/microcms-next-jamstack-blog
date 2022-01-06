import React, { VFC } from 'react';
import Image from 'next/image';

interface Props {
  mainVisual: {
    url: string;
  };
}

export const MainVisual: VFC<Props> = ({ mainVisual }) => {
  return (
    <div className="sticky top-[64px] mx-auto max-w-[960px] h-[480px]">
      <Image
        src={mainVisual ? mainVisual.url : '/no-image.png'}
        alt=""
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute bottom-0 w-full h-1/2 "></div>
    </div>
  );
};

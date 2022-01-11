import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Presenter } from './Presenter';

interface Data {
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

const ImageList = () => {
  const [data, setData] = useState<Data>();

  useEffect(() => {
    axios
      .get('https://mczk9402.microcms.io/api/v1/image-list', {
        responseType: 'json',
        headers: {
          'X-MICROCMS-API-KEY': process.env.NEXT_PUBLIC_API_KEY!,
        },
        params: {
          fields: 'image',
        },
      })
      .then((res) => {
        setData(res.data);
      });
  }, []);

  return <Presenter data={data} />;
};

export default ImageList;

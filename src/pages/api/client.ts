// libs/client.js
import { createClient } from 'microcms-js-sdk';

interface Client {
  serviceDomain: string;
  apiKey: string | undefined;
}

export const client = createClient({
  serviceDomain: 'mczk9402',
  apiKey: process.env.NEXT_PUBLIC_API_KEY as string,
});

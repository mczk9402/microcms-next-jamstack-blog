// libs/client.js
import { createClient } from 'microcms-js-sdk';

console.log(process.env.NEXT_PUBLIC_API_KEY);

export const client = createClient({
  serviceDomain: 'mczk9402',
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
});

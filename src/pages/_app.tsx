import { GlobalProvider } from 'context/global';
import { ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.css';
import { AppProps } from 'next/dist/shared/lib/router/router';

// https://de-milestones.com/nextjs_typescript_app-tsx_myapp/
const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ChakraProvider>
      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>
    </ChakraProvider>
  );
};

export default MyApp;

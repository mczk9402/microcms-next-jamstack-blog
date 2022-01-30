import { GlobalProvider } from 'context/global';
import { ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.css';
import { AppProps } from 'next/dist/shared/lib/router/router';
import { GoogleAnalytics, existsGaId, pageview } from 'libs/gtag';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { NextUIProvider } from '@nextui-org/react';

// https://de-milestones.com/nextjs_typescript_app-tsx_myapp/
const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const router = useRouter();
  useEffect(() => {
    if (!existsGaId) {
      return;
    }

    const handleRouteChange = (path: any) => {
      pageview(path);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  return (
    <NextUIProvider>
      <ChakraProvider>
        <GlobalProvider>
          <GoogleAnalytics />
          <Component {...pageProps} />
        </GlobalProvider>
      </ChakraProvider>
    </NextUIProvider>
  );
};

export default MyApp;

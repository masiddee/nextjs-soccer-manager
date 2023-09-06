import {AppProps} from 'next/app';
import {UserProvider} from '@auth0/nextjs-auth0/client';
import {ApolloProvider} from '@apollo/client';
import apolloClient from '@/lib/apollo';
import {globalCss, NextUIProvider} from '@nextui-org/react';
import {customTheme} from '../styles/nextui.theme';
import '@/styles/globals.css';
import Layout from '@/components/Layout';
import ErrorBoundary from '@/components/ErrorBoundary';

const globalStyles = globalCss({
  body: {
    fontFamily: '$mono',
    margin: 0,
  },
});

export default function App({Component, pageProps}: AppProps) {
  globalStyles();

  return (
    <UserProvider>
      <ApolloProvider client={apolloClient}>
        <NextUIProvider theme={customTheme}>
          <Layout>
            <ErrorBoundary fallback={<h1>Something went wrong...</h1>}>
              <Component {...pageProps} />
            </ErrorBoundary>
          </Layout>
        </NextUIProvider>
      </ApolloProvider>
    </UserProvider>
  );
}

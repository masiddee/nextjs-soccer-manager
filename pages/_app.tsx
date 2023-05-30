import {AppProps} from 'next/app';
import {UserProvider} from '@auth0/nextjs-auth0/client';
import {ApolloProvider} from '@apollo/client';
import apolloClient from '@/lib/apollo';
import {NextUIProvider} from '@nextui-org/react';
import '@/styles/globals.css';
import Layout from '@/components/Layout';

export default function App({Component, pageProps}: AppProps) {
  return (
    <UserProvider>
      <ApolloProvider client={apolloClient}>
        <NextUIProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </NextUIProvider>
      </ApolloProvider>
    </UserProvider>
  );
}

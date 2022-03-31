import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query';
import { GoogleAuthProvider } from '../contexts/GoogleAuthContext';

import { SessionProvider as GoogleProvider } from 'next-auth/react';

const queryClient = new QueryClient();

import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </GoogleProvider >
  );
}

export default MyApp

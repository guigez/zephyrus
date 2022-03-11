import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query';
import { GoogleAuthProvider } from '../contexts/GoogleAuthContext';

const queryClient = new QueryClient();

import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleAuthProvider>
        <Component {...pageProps} />
      </GoogleAuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp

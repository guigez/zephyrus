import type { AppProps } from 'next/app'
import { GoogleAuthProvider } from '../contexts/GoogleAuthContext';


import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleAuthProvider>
      <Component {...pageProps} />
    </GoogleAuthProvider>
  );
}

export default MyApp

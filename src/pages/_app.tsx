import type { AppProps } from 'next/app'

import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
  <script
      src="https://maps.googleapis.com/maps/api/js?key=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&callback=initMap&v=weekly"
      async
    ></script>
  return <Component {...pageProps} />
}

export default MyApp

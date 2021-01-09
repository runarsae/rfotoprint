import type { AppProps } from "next/app";
import Head from "next/head";

function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default App;

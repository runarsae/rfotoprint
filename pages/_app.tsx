import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/global.css';
import { ThemeProvider } from 'styled-components';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

const theme = {
    primary: '#AD8226',
    secondary: '#93867F',
    background: {
        dark: '#292B2C',
        light: '#323536'
    },
    title: '#292B2C',
    text: '#494949'
};

function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ThemeProvider theme={theme}>
                <Header />
                <Component {...pageProps} />
                <Footer />
            </ThemeProvider>
        </>
    );
}

export default App;

import React from 'react';
import { ThemeProvider } from 'styled-components';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import FotoServices from './sections/FotoServices';
import Introduction from './sections/Introduction';

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

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Header />
            <Introduction />
            <FotoServices />
            <Footer />
        </ThemeProvider>
    );
}

export default App;

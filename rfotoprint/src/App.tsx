import React from 'react';
import { ThemeProvider } from 'styled-components';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import FotoServices from './sections/FotoServices';
import Introduction from './sections/Introduction';
import { theme } from './constants';

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

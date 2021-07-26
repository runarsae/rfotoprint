import React from 'react';
import { ThemeProvider } from 'styled-components';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import FotoServices from './sections/FotoServices';
import Introduction from './sections/Introduction';
import Supplies from './sections/Supplies';
import { theme } from './constants';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Header />
            <Introduction />
            <FotoServices />
            <Supplies />
            <Footer />
        </ThemeProvider>
    );
}

export default App;

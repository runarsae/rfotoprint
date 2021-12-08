import { ThemeProvider } from 'styled-components';
import Home from './components/pages/home';
import { theme } from './theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Home />
        </ThemeProvider>
    );
}

export default App;

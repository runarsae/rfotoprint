import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import Home from './components/pages/home';
import { theme } from './theme';

function App() {
    return (
        <RecoilRoot>
            <ThemeProvider theme={theme}>
                <Home />
            </ThemeProvider>
        </RecoilRoot>
    );
}

export default App;

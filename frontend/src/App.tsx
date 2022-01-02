import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import Catalog from './components/pages/catalog';
import Home from './components/pages/home';
import SignIn from './components/pages/sign-in';
import { theme } from './theme';

function App() {
    let location = useLocation();
    let navigate = useNavigate();

    // Remove auth token on log out
    useEffect(() => {
        if (location.pathname === '/logg-ut') {
            if (localStorage.getItem('token')) {
                localStorage.removeItem('token');
            }

            navigate('/');
        }
    }, [location.pathname]);

    return (
        <RecoilRoot>
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="logg-inn" element={<SignIn />} />
                    <Route path="logg-ut" element={<></>} />
                    <Route path="katalog" element={<Catalog />} />
                    <Route path="*" element={<>Not found</>} />
                </Routes>
            </ThemeProvider>
        </RecoilRoot>
    );
}

export default App;

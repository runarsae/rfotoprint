import { ClientContext } from 'graphql-hooks';
import { useContext, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import Catalog from './components/pages/catalog';
import Home from './components/pages/home';
import NotFound from './components/pages/not-found';
import Panel from './components/pages/panel';
import SignIn from './components/pages/sign-in';
import { theme } from './theme';

function App() {
    let location = useLocation();
    let navigate = useNavigate();

    const client = useContext(ClientContext);

    // Remove auth token and header on log out
    useEffect(() => {
        if (location.pathname === '/logg-ut') {
            localStorage.removeItem('token');
            client.removeHeader('Authorization');

            navigate('/');
        }
    }, [location.pathname]);

    return (
        <ThemeProvider theme={theme}>
            <RecoilRoot>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="logg-inn" element={<SignIn />} />
                    <Route path="logg-ut" element={<></>} />
                    <Route path="panel" element={<Panel />} />
                    <Route path="katalog" element={<Catalog />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </RecoilRoot>
        </ThemeProvider>
    );
}

export default App;

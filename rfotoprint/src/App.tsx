import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './constants';
import Index from './routes/Index';
import Panel from './routes/Panel';
import SignIn from './routes/SignIn';
import { AuthContext, verifyAuth } from './utils/auth';

function App() {
    const auth = verifyAuth();

    return (
        <AuthContext.Provider value={auth}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/logg-inn">
                            <SignIn />
                        </Route>
                        <Route path="/panel">
                            <Panel />
                        </Route>
                        <Route path="/">
                            <Index />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </ThemeProvider>
        </AuthContext.Provider>
    );
}

export default App;

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './constants';
import Index from './routes/Index';
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
                        <Route
                            path="/logg-ut"
                            render={({ history }) => {
                                if (localStorage.getItem('token')) {
                                    localStorage.removeItem('token');
                                }
                                history.push('/');
                                return <></>;
                            }}
                        />
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

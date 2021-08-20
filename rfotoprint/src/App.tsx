import { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './constants';
import Index from './routes/Index';
import SignIn from './routes/SignIn';
import { AuthContext, verifyAuth } from './utils/auth';

function App() {
    const [auth, reVerifyAuth] = verifyAuth();

    const history = useHistory();

    // Re-verify authentication when routing is done
    useEffect(() => {
        history.listen(() => {
            reVerifyAuth();
        });
    }, []);

    return (
        <AuthContext.Provider value={auth}>
            <ThemeProvider theme={theme}>
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
            </ThemeProvider>
        </AuthContext.Provider>
    );
}

export default App;

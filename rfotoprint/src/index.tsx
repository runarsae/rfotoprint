import { ClientContext, GraphQLClient } from 'graphql-hooks';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './constants';
import './global.css';
import reportWebVitals from './reportWebVitals';
import App from './routes/App';
import Panel from './routes/Panel';
import SignIn from './routes/SignIn';

// GraphQL client to execute API queries and mutations
const client = new GraphQLClient({
    url: process.env.REACT_APP_SERVER_ADDRESS + '/graphql'
});

ReactDOM.render(
    <React.StrictMode>
        <ClientContext.Provider value={client}>
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
                            <App />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </ThemeProvider>
        </ClientContext.Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

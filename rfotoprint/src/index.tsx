import React from 'react';
import ReactDOM from 'react-dom';
import './global.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { ClientContext, GraphQLClient } from 'graphql-hooks';
import { BrowserRouter } from 'react-router-dom';

// GraphQL client to execute API queries and mutations
const client = new GraphQLClient({
    url: process.env.REACT_APP_SERVER_ADDRESS + '/graphql'
});

ReactDOM.render(
    <React.StrictMode>
        <ClientContext.Provider value={client}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ClientContext.Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

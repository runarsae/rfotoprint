import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-loading-skeleton/dist/skeleton.css';
import App from './App';
import { ClientContext, GraphQLClient } from 'graphql-hooks';
import { BrowserRouter } from 'react-router-dom';

// GraphQL client to execute API queries and mutations
const client = new GraphQLClient({
    url: '/graphql'
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

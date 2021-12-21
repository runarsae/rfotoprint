import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ClientContext, GraphQLClient } from 'graphql-hooks';

// GraphQL client to execute API queries and mutations
const client = new GraphQLClient({
    url: '/graphql'
});

ReactDOM.render(
    <React.StrictMode>
        <ClientContext.Provider value={client}>
            <App />
        </ClientContext.Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

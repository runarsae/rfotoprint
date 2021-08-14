import { ClientContext, useQuery } from 'graphql-hooks';
import { createContext, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { VERIFY_AUTH } from '../api/queries';

export const AuthContext = createContext(false);

export const requireAuth = () => {
    const history = useHistory();

    if (!localStorage.getItem('token')) {
        history.push('/logg-inn');
    }
};

// BUG: This is called twice when app mounts
export const verifyAuth = (): boolean => {
    console.log('Verifying authentication..');

    const client = useContext(ClientContext);

    const token = localStorage.getItem('token');

    if (token) {
        client.setHeader('Authorization', token);
    } else {
        client.removeHeader('Authorization');
        console.log('Not authenticated.');
        return false;
    }

    const { error, data } = useQuery(VERIFY_AUTH);

    if (error || (data && !data.verifyAuth.success)) {
        localStorage.removeItem('token');
        console.log('Not authenticated.');
        return false;
    }

    console.log('Authenticated.');
    return true;
};

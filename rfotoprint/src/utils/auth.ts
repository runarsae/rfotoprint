import { ClientContext, useManualQuery, useQuery } from 'graphql-hooks';
import { createContext, useContext, useEffect, useState } from 'react';
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
export const verifyAuth = (): [boolean, () => void] => {
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    const client = useContext(ClientContext);

    const [verifyAuthCallback] = useManualQuery(VERIFY_AUTH);

    const checkAuth = () => {
        console.log('Verifying authentication..');

        const token = localStorage.getItem('token');

        if (token) {
            client.setHeader('Authorization', token);
        } else {
            client.removeHeader('Authorization');
            console.log('Not authenticated.');
            setAuthenticated(false);
            return;
        }

        (async () => {
            await verifyAuthCallback().then(({ error, data }) => {
                if (error || (data && !data.verifyAuth.success)) {
                    localStorage.removeItem('token');
                    console.log('Not authenticated.');
                    setAuthenticated(false);
                    return;
                }

                console.log('Authenticated.');
                setAuthenticated(true);
            });
        })();
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return [authenticated, checkAuth];
};

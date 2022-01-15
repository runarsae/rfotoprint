import { ClientContext, useManualQuery } from 'graphql-hooks';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VERIFY_AUTH } from '../api/queries';

export const useAuth = () => {
    const [auth, setAuth] = useState<boolean>(false);

    const client = useContext(ClientContext);
    let navigate = useNavigate();

    const [verifyAuth] = useManualQuery(VERIFY_AUTH);

    const checkAuth = async () => {
        console.log('Verifying authentication..');

        const token = localStorage.getItem('token');

        if (token) {
            client.setHeader('Authorization', token);
        } else {
            client.removeHeader('Authorization');
            setAuth(false);
            console.log('Not authenticated (no token).');
            navigate('/logg-inn');
            return;
        }

        await verifyAuth().then(({ error, data }) => {
            if (error || (data && !data.verifyAuth.success)) {
                localStorage.removeItem('token');
                client.removeHeader('Authorization');
                setAuth(false);
                console.log('Not authenticated (invalid token).');
                navigate('/logg-inn');
                return;
            }

            console.log('Authenticated.');
            setAuth(true);
        });
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return auth;
};

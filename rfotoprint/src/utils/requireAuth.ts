import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export const requireAuth = () => {
    const history = useHistory();

    useEffect(() => {
        // TODO: Send request to server to check if token is valid
        if (!localStorage.getItem('token')) {
            history.push('/logg-inn');
        }
    }, []);
};

import { ClientContext, useQuery } from 'graphql-hooks';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { VERIFY_AUTH } from '../api/queries';

export const requireAuth = () => {
    // const client = useContext(ClientContext);
    const history = useHistory();
    // const token = localStorage.getItem('token');
    // if (token) {
    //     client.setHeader('Authorization', token);
    // } else {
    //     client.removeHeader('Authorization');
    //     history.push('/logg-inn');
    // }
    // const { error, data } = useQuery(VERIFY_AUTH);
    // useEffect(() => {
    //     if (error) {
    //         history.push('/logg-inn');
    //     }
    //     if (data) {
    //         if (!data.verifyAuth.success) {
    //             localStorage.removeItem('token');
    //             history.push('/logg-inn');
    //         }
    //     }
    // }, [error, data]);

    if (!verifyAuth()) {
        history.push('/logg-inn');
    }
};

export const verifyAuth = (): boolean => {
    const client = useContext(ClientContext);

    const token = localStorage.getItem('token');

    if (token) {
        client.setHeader('Authorization', token);
    } else {
        client.removeHeader('Authorization');
        return false;
    }

    const { error, data } = useQuery(VERIFY_AUTH);

    if (error || (data && !data.verifyAuth.success)) {
        localStorage.removeItem('token');
        return false;
    }

    return true;
};

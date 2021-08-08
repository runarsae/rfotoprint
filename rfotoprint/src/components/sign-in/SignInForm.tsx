import { ClientContext, useMutation } from 'graphql-hooks';
import { FormEvent, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { SIGN_IN } from '../../api/mutations';
import Label from '../common/form/Label';
import SubmitButton from '../common/form/SubmitButton';
import TextInput from '../common/form/TextInput';
import Error from '../common/form/Error';

const Form = styled.form`
    width: 100%;
    max-width: 300px;
    display: grid;
    grid-template-columns: 100%;
    gap: 20px;
`;

function SignInForm() {
    const client = useContext(ClientContext);

    const history = useHistory();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [signIn] = useMutation(SIGN_IN);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!username && !password) {
            setErrorMessage('Vennligst fyll inn brukernavn og passord.');
            return;
        }

        if (!username) {
            setErrorMessage('Vennligst fyll inn brukernavn.');
            return;
        }

        if (!password) {
            setErrorMessage('Vennligst fyll inn passord.');
            return;
        }

        const { data } = await signIn({
            variables: { username: username, password: password }
        });

        if (data) {
            if (!data.signIn.success) {
                setErrorMessage(data.signIn.message);
                return;
            }

            const token = data.signIn.data;
            client.setHeader('Authorization', `${token}`);

            localStorage.setItem('token', token);

            history.push('/panel');
        } else {
            setErrorMessage('Systemfeil: Innlogging mislykket.');
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <div>
                <Label htmlFor="username">Brukernavn</Label>
                <TextInput
                    type="text"
                    id="username"
                    name="username"
                    onChange={(e) => {
                        setErrorMessage(null);
                        setUsername(e.target.value);
                    }}
                />
            </div>
            <div>
                <Label htmlFor="password">Passord</Label>
                <TextInput
                    type="password"
                    id="password"
                    name="password"
                    onChange={(e) => {
                        setErrorMessage(null);
                        setPassword(e.target.value);
                    }}
                />
            </div>
            {errorMessage && <Error>{errorMessage}</Error>}
            <SubmitButton value="Logg inn" />
        </Form>
    );
}

export default SignInForm;

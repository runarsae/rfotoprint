import styled, { useTheme } from 'styled-components';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Section from '../../common/Section';
import { ClientContext, useMutation } from 'graphql-hooks';
import { SIGN_IN } from '../../../api/mutations';
import { Form } from '../../common/form/Form';
import Label from '../../common/form/Label';
import TextInput from '../../common/form/TextInput';
import Typography from '../../common/Typography';
import SubmitButton from '../../common/form/SubmitButton';
import logo from '../../../logo/logo-2-dark.svg';

const Content = styled.div({
    alignSelf: 'center',
    maxWidth: '300px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '40px'
});

const Logo = styled.img({
    display: 'block',
    width: '200px'
});

function SignIn() {
    const theme = useTheme();

    const navigate = useNavigate();

    const client = useContext(ClientContext);

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [signIn] = useMutation(SIGN_IN);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/panel');
        }
    }, []);

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
            client.setHeader('Authorization', token);

            localStorage.setItem('token', token);

            navigate('/panel');
        } else {
            setErrorMessage('Systemfeil: Innlogging mislykket.');
        }
    };

    return (
        <Section>
            <Content>
                <Logo src={logo} alt="Rossland Fotoprint" />
                <Form onSubmit={handleSubmit}>
                    <div>
                        <Label htmlFor="username">Brukernavn</Label>
                        <TextInput
                            type="text"
                            id="username"
                            name="username"
                            autoComplete="username"
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
                            autoComplete="current-password"
                            onChange={(e) => {
                                setErrorMessage(null);
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                    {errorMessage && (
                        <Typography variant="body3" color={theme.palette.error}>
                            {errorMessage}
                        </Typography>
                    )}
                    <SubmitButton value="Logg inn" />
                </Form>
            </Content>
        </Section>
    );
}

export default SignIn;

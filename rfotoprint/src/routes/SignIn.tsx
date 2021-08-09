import Section from '../components/common/Section';
import SignInForm from '../components/sign-in/SignInForm';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { verifyAuth } from '../utils/auth';

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Logo = styled.img`
    display: block;
    height: 65px;
    margin-bottom: 40px;
`;

function SignIn() {
    const history = useHistory();

    useEffect(() => {
        // TODO: If token is set, verify it and redirect to panel, else clear it
        if (localStorage.getItem('token')) {
            history.push('/panel');
        }
    });

    return (
        <Section color="light">
            <Content>
                <Logo src="/img/logo_dark.png" alt="Rossland Fotoprint" />
                <SignInForm />
            </Content>
        </Section>
    );
}

export default SignIn;

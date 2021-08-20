import Section from '../components/common/Section';
import SignInForm from '../components/sign-in/SignInForm';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

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
        if (localStorage.getItem('token')) {
            history.push('/');
        }
    });

    return (
        <Section color="light">
            <Content>
                <Logo src="/img/logo_dark.png" alt="Rossland Fotoprint" />
                <div style={{ maxWidth: '300px', width: '100%' }}>
                    <SignInForm />
                </div>
            </Content>
        </Section>
    );
}

export default SignIn;

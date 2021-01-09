import React from 'react';
import styled from 'styled-components';
import Contact from './Contact';
import Facebook from './Facebook';
import Profile from './Profile';

const Wrapper = styled.div`
    width: 100%;
    height: auto;
    margin-top: auto;
`;

const FooterBar = styled.div`
    background: ${(props) => props.theme.background.light};
    width: 100%;
`;

const FooterContent = styled.div`
    padding: 40px 20px;
    width: 100%;
    max-width: 1300px;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas:
        'contact'
        'profile'
        'facebook';
    gap: 60px;
    color: #ffffff;

    @media (min-width: 520px) {
        padding: 40px;
    }

    @media (min-width: 640px) {
        grid-template-columns: repeat(2, 1fr);
        grid-template-areas:
            'contact facebook'
            'profile profile';
        gap: 40px 40px;
    }

    @media (min-width: 768px) {
        gap: 40px 100px;
    }

    @media (min-width: 1080px) {
        grid-template-columns: repeat(3, 1fr);
        grid-template-areas: 'contact profile facebook';
        gap: 20px;
    }
`;

const CopyrightBar = styled.div`
    width: 100%;
    padding: 10px 30px;
    background: ${(props) => props.theme.background.dark};
    color: #999999;
    text-align: center;
    font-size: 14px;

    @media (min-width: 520px) {
        padding: 10px 40px;
    }
`;

function Footer(): JSX.Element {
    return (
        <Wrapper>
            <FooterBar>
                <FooterContent>
                    <Contact />
                    <Profile />
                    <Facebook />
                </FooterContent>
            </FooterBar>
            <CopyrightBar>
                Copyright &copy; {new Date().getFullYear()}, R Fotoprint
            </CopyrightBar>
        </Wrapper>
    );
}

export default Footer;

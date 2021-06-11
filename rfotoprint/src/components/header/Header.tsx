import React from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';

const Wrapper = styled.div`
    background: ${(props) => props.theme.background.dark};
    padding: 40px 20px;
    width: 100%;

    @media (min-width: 520px) {
        padding: 40px;
    }
`;

const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    max-width: 1300px;
    margin: auto;
    justify-items: center;
    align-items: center;
    gap: 20px;

    @media (min-width: 750px) {
        justify-items: left;
        grid-template-columns: 1fr auto;
    }
`;

const Logo = styled.img`
    display: block;
    position: relative;
    height: 80px;
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
`;

function Header(): JSX.Element {
    return (
        <Wrapper>
            <Content>
                <Logo src="/img/logo.png" alt="Rossland Fotoprint" />
                <Navigation />
            </Content>
        </Wrapper>
    );
}

export default Header;

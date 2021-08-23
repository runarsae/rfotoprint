import React from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';

const Wrapper = styled.div`
    max-width: min(1300px, 95%);
    margin: auto;

    @media (min-width: 640px) {
        margin: 8px auto;
    }
`;

const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas: 'logo' 'navigation' 'line';
    margin: auto;
    justify-items: center;
    align-items: center;
    gap: 20px;

    @media (min-width: 768px) {
        justify-items: left;
        gap: 0px;
        grid-template-columns: 1fr auto;
        grid-template-areas: 'logo navigation' 'line line';
    }
`;

const Logo = styled.img`
    display: block;
    grid-area: logo;
    position: relative;
    height: 80px;
    margin: 40px 0 0 0;
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */

    @media (min-width: 768px) {
        height: 65px;
        margin: 20px 0;
    }
`;

const Line = styled.div`
    grid-area: line;
    width: min(1300px, 95%);
    height: 1px;
    margin: auto;
    background-color: #e2e2e2;
`;

function Header(): JSX.Element {
    return (
        <>
            <Wrapper>
                <Content>
                    <Logo src="/img/logo_dark.png" alt="Rossland Fotoprint" />
                    <Navigation />
                </Content>
            </Wrapper>
            <Line />
        </>
    );
}

export default Header;

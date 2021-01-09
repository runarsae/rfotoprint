import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Navigation from './Navigation';

const Wrapper = styled.div`
    background: ${(props) => props.theme.background.dark};
    padding: 30px 20px;
    width: 100%;

    @media (min-width: 520px) {
        padding: 40px;
    }
`;

const Logo = styled.div`
    display: block;
    position: relative;
    width: 160px;
    height: 77.02px;
    margin: auto;
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */

    @media (min-width: 520px) {
        width: 200px;
        height: 96.27px;
    }
`;

function Header(): JSX.Element {
    return (
        <Wrapper>
            <Logo>
                <Image src="/logo.png" alt="Rossland Fotoprint" layout="fill" />
            </Logo>
            <Navigation />
        </Wrapper>
    );
}

export default Header;

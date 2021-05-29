import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from './Navigation';

const Wrapper = styled.div`
    background: ${(props) => props.theme.background.dark};
    width: 100%;
`;

const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    max-width: 1300px;
    margin: auto;
    justify-items: center;
    align-items: center;
    gap: 20px;
    padding: 40px 20px;

    @media (min-width: 520px) {
        padding: 40px;
    }

    @media (min-width: 830px) {
        justify-items: left;
        grid-template-columns: 1fr auto;
    }
`;

const Logo = styled.div`
    display: block;
    position: relative;
    width: 160px;
    height: 77.02px;
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
`;

function Header(): JSX.Element {
    return (
        <Wrapper>
            <Content>
                <Logo>
                    <Link href="/hjem">
                        <a>
                            <Image
                                src="/logo.png"
                                alt="Rossland Fotoprint"
                                layout="fill"
                            />
                        </a>
                    </Link>
                </Logo>
                <Navigation />
            </Content>
        </Wrapper>
    );
}

export default Header;

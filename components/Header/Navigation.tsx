import { useReactiveVar } from '@apollo/client';
import React from 'react';
import styled from 'styled-components';
import { currentPageVar } from '../../cache';
import Link from './Link';

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    margin-top: 30px;

    @media (min-width: 520px) {
        margin-top: 40px;
    }
`;

function Navigation(): JSX.Element {
    const currentPage = useReactiveVar(currentPageVar);

    return (
        <Wrapper>
            <Link page="hjem" active={currentPage === 'hjem'} />
            <Link
                page="fototjenester"
                active={currentPage === 'fototjenester'}
            />
            <Link
                page="kontorrekvisita"
                active={currentPage === 'kontorrekvisita'}
            />
            <Link page="diverse" active={currentPage === 'diverse'} />
        </Wrapper>
    );
}

export default Navigation;

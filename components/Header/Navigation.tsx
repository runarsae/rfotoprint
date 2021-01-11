import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from './Link';

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    margin-top: 10px;
`;

function Navigation(): JSX.Element {
    const router = useRouter();
    const currentPage = router.pathname;

    return (
        <Wrapper>
            <Link page="hjem" active={currentPage === '/hjem'} />
            <Link
                page="fototjenester"
                active={currentPage === '/fototjenester'}
            />
            <Link
                page="kontorrekvisita"
                active={currentPage === '/kontorrekvisita'}
            />
            <Link page="diverse" active={currentPage === '/diverse'} />
        </Wrapper>
    );
}

export default Navigation;

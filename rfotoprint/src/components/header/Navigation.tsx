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
    return (
        <Wrapper>
            <Link page="fototjenester" />
            <Link page="kontorrekvisita" />
            <Link page="diverse" />
        </Wrapper>
    );
}

export default Navigation;

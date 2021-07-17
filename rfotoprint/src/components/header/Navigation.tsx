import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Sections } from '../../constants';
import Link from './Link';

const Wrapper = styled.div`
    display: flex;
    grid-area: navigation;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    margin-top: 10px;
`;

function Navigation(): JSX.Element {
    return (
        <Wrapper>
            {Object.values(Sections).map((s) => (
                <Link key={s} section={s} />
            ))}
        </Wrapper>
    );
}

export default Navigation;

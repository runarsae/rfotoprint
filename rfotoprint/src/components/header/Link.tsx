import React, { useState } from 'react';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';

const DURATION = 100;

const Wrapper = styled.div`
    display: inline-block;
    margin-bottom: 3px;
`;

const Button = styled.button`
    font-size: 18px;
    background-color: transparent;
    cursor: pointer;
    outline: 0;
    border: 0;
    padding: 6px 6px 3px 6px;
    margin: 0 10px;
    text-transform: capitalize;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    transition: color ${DURATION}ms ease-in-out;
    color: #ffffff;

    &:hover {
        ${(props) => ({ color: props.theme.primary })};
    }

    @media (min-width: 520px) {
        font-size: 18px;
    }
`;

const Underline = styled.div`
    background-color: ${(props) => props.theme.primary};
    width: 0;
    height: 1px;
    margin: auto;
    border-radius: 0.5px;
    transition: width ${DURATION - 20}ms ease-in-out;
`;

const transitionStyles: { [id: string]: React.CSSProperties } = {
    entered: { width: 'calc(100% - 32px)' }
};

type Pages = 'fototjenester' | 'kontorrekvisita' | 'diverse';

interface Props {
    page: Pages;
}

function Link(props: Props): JSX.Element {
    const [isHovering, setIsHovering] = useState<boolean>(false);

    return (
        <Wrapper>
            <Button
                onMouseOver={() => setIsHovering(true)}
                onMouseOut={() => setIsHovering(false)}
                onClick={() => undefined}
            >
                {props.page}
            </Button>

            <Transition in={isHovering} timeout={DURATION}>
                {(state) => (
                    <Underline
                        style={{
                            ...transitionStyles[state]
                        }}
                    />
                )}
            </Transition>
        </Wrapper>
    );
}

export default Link;

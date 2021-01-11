import React from 'react';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';
import { useRouter } from 'next/router';

const DURATION = 100;

const Wrapper = styled.div`
    display: inline-block;
    margin-bottom: 3px;
`;

const Button = styled.button<{ active: boolean }>`
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
    color: ${(props) => (props.active ? props.theme.primary : 'white')};

    &:hover {
        ${(props) => !props.active && { color: '#A4A4A4' }};
    }

    @media (min-width: 520px) {
        font-size: 18px;
    }
`;

const Underline = styled.div<{ active: boolean }>`
    background-color: ${(props) => props.theme.primary};
    width: 0;
    height: 1px;
    margin: auto;
    border-radius: 0.5px;
    transition: width ${DURATION}ms ease-in-out;
`;

const transitionStyles: { [id: string]: React.CSSProperties } = {
    entered: { width: 'calc(100% - 32px)' }
};

type Pages = 'hjem' | 'fototjenester' | 'kontorrekvisita' | 'diverse';

interface Props {
    page: Pages;
    active: boolean;
}

function Link(props: Props): JSX.Element {
    const router = useRouter();

    return (
        <Wrapper>
            <Button
                onClick={() => {
                    router.push('/' + props.page);
                }}
                active={props.active}
            >
                {props.page}
            </Button>

            <Transition in={props.active} timeout={DURATION}>
                {(state) => (
                    <Underline
                        active={props.active}
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

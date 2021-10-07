import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';
import { useEffect } from 'react';

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
    padding: 0;
    margin: 0;
    -webkit-appearance: none;

    transition: color ${DURATION}ms ease-in-out;
    color: ${(props) => props.theme.primary};
`;

const Underline = styled.div`
    background-color: ${(props) => props.theme.primary};
    width: 0;
    height: 1px;
    margin: auto;
    border-radius: 0.5px;
    transition: width ${DURATION}ms ease-in-out;
`;

const transitionStyles: { [id: string]: React.CSSProperties } = {
    entered: { width: '100%' }
};

interface Props {
    children: string;
    onMouseDown: () => void;
    closingCondition: boolean;
}

function ButtonLink(props: Props): JSX.Element {
    const [isUnderlined, setIsUnderlined] = useState<boolean>(false);

    const linkRef = useRef(null);

    useEffect(() => {
        if (props.closingCondition) {
            setIsUnderlined(true);
        } else {
            setIsUnderlined(false);
        }
    }, [props.closingCondition]);

    return (
        <Wrapper>
            <Button
                onMouseOver={() => setIsUnderlined(true)}
                onMouseOut={() => {
                    if (!props.closingCondition) {
                        setIsUnderlined(false);
                    }
                }}
                onMouseDown={() => props.onMouseDown()}
            >
                {props.children}
            </Button>

            <Transition nodeRef={linkRef} in={isUnderlined} timeout={DURATION}>
                {(state) => (
                    <Underline
                        ref={linkRef}
                        style={{
                            ...transitionStyles[state]
                        }}
                    />
                )}
            </Transition>
        </Wrapper>
    );
}

export default ButtonLink;

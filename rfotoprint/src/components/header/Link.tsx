import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';
import { scroller } from 'react-scroll';
import { Sections } from '../../constants';

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
    color: ${(props) => props.theme.title};

    &:hover {
        ${(props) => ({ color: props.theme.primary })};
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

interface Props {
    section: Sections;
}

function Link(props: Props): JSX.Element {
    const [isHovering, setIsHovering] = useState<boolean>(false);

    const linkRef = useRef(null);

    return (
        <Wrapper>
            <Button
                onMouseOver={() => setIsHovering(true)}
                onMouseOut={() => setIsHovering(false)}
                onMouseDown={() => {
                    scroller.scrollTo(props.section.valueOf(), {
                        duration: 1000,
                        smooth: 'easeInOutQuad'
                    });
                }}
            >
                {props.section}
            </Button>

            <Transition nodeRef={linkRef} in={isHovering} timeout={DURATION}>
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

export default Link;

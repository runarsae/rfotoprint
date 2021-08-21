import { useRef } from 'react';
import { Transition } from 'react-transition-group';
import styled from 'styled-components';

const Backdrop = styled.div`
    display: block;
    opacity: 0;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
    transition: opacity 130ms ease-in-out;
    z-index: 10;
`;

const overlayTransitionStyles: { [id: string]: React.CSSProperties } = {
    entered: { opacity: 1 }
};

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function Overlay(props: Props) {
    const overlayRef = useRef(null);

    return (
        <Transition nodeRef={overlayRef} mountOnEnter unmountOnExit in={props.open} timeout={130}>
            {(state) => (
                <Backdrop
                    ref={overlayRef}
                    onClick={props.onClose}
                    style={{
                        ...overlayTransitionStyles[state]
                    }}
                />
            )}
        </Transition>
    );
}

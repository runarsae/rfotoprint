import { useEffect, useRef } from 'react';
import { Transition } from 'react-transition-group';
import styled from 'styled-components';
import { disableScroll, enableScroll } from '../../utils/toggleScroll';
import CloseButton from './CloseButton';
import Overlay from './Overlay';

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 12;
    opacity: 0;
    padding: 100px 20px 20px 20px;
    pointer-events: none;

    @media (min-width: 520px) {
        padding: 100px 40px 40px 40px;
    }
`;

const Content = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
`;

const popupTransitionStyles: { [id: string]: React.CSSProperties } = {
    entered: { opacity: 1 }
};

interface Props {
    children: JSX.Element;
    open: boolean;
    onClose: () => void;
}

export default function Popup(props: Props) {
    const popupRef = useRef(null);

    useEffect(() => {
        if (props.open) {
            disableScroll();
        } else {
            enableScroll();
        }
    }, [props.open]);

    return (
        <>
            <Overlay open={props.open} onClose={props.onClose} />
            <Transition nodeRef={popupRef} mountOnEnter unmountOnExit in={props.open} timeout={130}>
                {(state) => (
                    <Wrapper
                        ref={popupRef}
                        style={{
                            transition: `opacity 130ms ease-in-out`,
                            ...popupTransitionStyles[state]
                        }}
                    >
                        <CloseButton onClick={props.onClose} />
                        <Content>{props.children}</Content>
                    </Wrapper>
                )}
            </Transition>
        </>
    );
}

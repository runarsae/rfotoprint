import { useEffect, useRef } from 'react';
import { Transition } from 'react-transition-group';
import styled from 'styled-components';
import { TRANSITION_DURATION } from '../../constants';
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
    overflow: auto;
    padding: 100px 20px 20px 20px;

    @media (min-width: 520px) {
        padding: 100px 40px 40px 40px;
    }
`;

const Content = styled.div`
    width: 100%;
    min-height: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
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
            <Transition
                nodeRef={popupRef}
                mountOnEnter
                unmountOnExit
                in={props.open}
                timeout={TRANSITION_DURATION}
            >
                {(state) => (
                    <Wrapper
                        ref={popupRef}
                        style={{
                            transition: `opacity ${TRANSITION_DURATION}ms ease-in-out`,
                            ...popupTransitionStyles[state]
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            props.onClose();
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

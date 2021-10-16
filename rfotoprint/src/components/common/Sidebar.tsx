import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Section from './Section';
import { Transition } from 'react-transition-group';
import { disableScroll, enableScroll } from '../../utils/toggleScroll';
import Overlay from './Overlay';
import CloseButton from './CloseButton';
import { TRANSITION_DURATION } from '../../constants';

const SidebarWrapper = styled.div`
    position: fixed;
    top: 0;
    right: -500px;
    background-color: ${(props) => props.theme.background.darker};
    height: 100%;
    width: 100%;
    max-width: 500px !important;
    transition: right ${TRANSITION_DURATION}ms ease-in-out;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 11;

    padding: 40px 20px;

    @media (min-width: 520px) {
        padding: 40px 40px;
    }
`;

const sidebarTransitionStyles: { [id: string]: React.CSSProperties } = {
    entered: { right: 0 }
};

interface Props {
    children: JSX.Element;
    open: boolean;
    closeSidebar: () => void;
}

export default function Sidebar(props: Props) {
    const sidebarRef = useRef(null);

    const close = (e: KeyboardEvent) => {
        if (props.open && e.key == 'Escape') {
            props.closeSidebar();
        }
    };

    useEffect(() => {
        if (props.open) {
            document.addEventListener('keydown', close, false);

            return () => {
                document.removeEventListener('keydown', close, false);
            };
        }
    }, [props.open]);

    useEffect(() => {
        if (props.open) {
            disableScroll();
        } else {
            enableScroll();
        }
    }, [props.open]);

    return (
        <>
            <Overlay open={props.open} onClose={props.closeSidebar} />
            <Transition
                nodeRef={sidebarRef}
                mountOnEnter
                unmountOnExit
                in={props.open}
                timeout={TRANSITION_DURATION}
            >
                {(state) => (
                    <div ref={sidebarRef}>
                        <SidebarWrapper
                            style={{
                                ...sidebarTransitionStyles[state]
                            }}
                        >
                            <>
                                <CloseButton onClick={props.closeSidebar} />
                                {props.children}
                            </>
                        </SidebarWrapper>
                    </div>
                )}
            </Transition>
        </>
    );
}

import React, { useRef } from 'react';
import styled from 'styled-components';
import Section from './Section';
import { Transition } from 'react-transition-group';

const DURATION = 150;

const Overlay = styled.div`
    display: block;
    opacity: 0;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    transition: opacity ${DURATION}ms ease-in-out;
`;

const overlayTransitionStyles: { [id: string]: React.CSSProperties } = {
    entered: { opacity: 1 }
};

const SidebarWrapper = styled(Section)`
    position: fixed;
    top: 0;
    right: -500px;
    background-color: ${(props) => props.theme.background.darker};
    height: 100%;
    width: 100%;
    max-width: 500px !important;
    transition: right ${DURATION}ms ease-in-out;
    overflow-y: auto;
    overflow-x: hidden;
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
    const overlayRef = useRef(null);

    return (
        <>
            <Transition
                nodeRef={overlayRef}
                mountOnEnter
                unmountOnExit
                in={props.open}
                timeout={DURATION}
            >
                {(state) => (
                    <Overlay
                        ref={overlayRef}
                        onClick={() => props.closeSidebar()}
                        style={{
                            ...overlayTransitionStyles[state]
                        }}
                    />
                )}
            </Transition>

            <Transition
                nodeRef={sidebarRef}
                mountOnEnter
                unmountOnExit
                in={props.open}
                timeout={DURATION}
            >
                {(state) => (
                    <div ref={sidebarRef}>
                        <SidebarWrapper
                            size="small"
                            style={{
                                ...sidebarTransitionStyles[state]
                            }}
                        >
                            {props.children}
                        </SidebarWrapper>
                    </div>
                )}
            </Transition>
        </>
    );
}

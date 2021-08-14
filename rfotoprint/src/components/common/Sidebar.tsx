import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Section from './Section';
import { Transition } from 'react-transition-group';
import { disableScroll, enableScroll } from '../../utils/toggleScroll';

const DURATION = 130;

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
    z-index: 10;
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
    z-index: 11;
`;

const sidebarTransitionStyles: { [id: string]: React.CSSProperties } = {
    entered: { right: 0 }
};

const CloseButton = styled.button`
    position: absolute;
    top: 50px;
    right: 20px;

    width: 20px;
    height: 20px;

    background-color: transparent;
    padding: 0;
    margin: 0;
    border: none;

    opacity: 1;
    transition: opacity ${DURATION}ms ease-in-out;

    :hover {
        cursor: pointer;
        opacity: 0.5;
    }

    @media (min-width: 520px) {
        right: 40px;
    }
`;

interface Props {
    children: JSX.Element;
    open: boolean;
    closeSidebar: () => void;
}

export default function Sidebar(props: Props) {
    const sidebarRef = useRef(null);
    const overlayRef = useRef(null);

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
                            <>
                                <CloseButton onClick={() => props.closeSidebar()}>
                                    <img src="/img/close.svg" alt="Close" />
                                </CloseButton>
                                {props.children}
                            </>
                        </SidebarWrapper>
                    </div>
                )}
            </Transition>
        </>
    );
}

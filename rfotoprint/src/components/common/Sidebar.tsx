import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Section from './Section';
import { Transition } from 'react-transition-group';
import { disableScroll, enableScroll } from '../../utils/toggleScroll';
import Overlay from './Overlay';
import CloseButton from './CloseButton';

const SidebarWrapper = styled(Section)`
    position: fixed;
    top: 0;
    right: -500px;
    background-color: ${(props) => props.theme.background.darker};
    height: 100%;
    width: 100%;
    max-width: 500px !important;
    transition: right 130ms ease-in-out;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 11;
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
                timeout={130}
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
                                <CloseButton onMouseDown={props.closeSidebar} />
                                {props.children}
                            </>
                        </SidebarWrapper>
                    </div>
                )}
            </Transition>
        </>
    );
}

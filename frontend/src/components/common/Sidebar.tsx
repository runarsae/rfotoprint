import React, { useEffect, useRef } from 'react';
import styled, { useTheme } from 'styled-components';
import { Transition } from 'react-transition-group';
import Overlay from './Overlay';
import CloseButton from './CloseButton';
import { disableScroll, enableScroll } from '../../util/toggleScroll';

const Wrapper = styled.div((props) => ({
    position: 'fixed',
    top: 0,
    right: '-500px',
    backgroundColor: props.theme.palette.common.black,
    height: '100%',
    width: '100%',
    maxWidth: '500px !important',
    transition: 'right ' + props.theme.transitionDuration + 'ms ease',
    overflowY: 'auto',
    overflowX: 'hidden',
    zIndex: 11,

    padding: '40px 20px',

    [`@media (min-width: ${props.theme.breakpoints.sm}px)`]: {
        padding: '40px 40px'
    }
}));

const sidebarTransitionStyles: { [id: string]: React.CSSProperties } = {
    entered: { right: 0 }
};

interface Props {
    children: React.ReactNode;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function Sidebar(props: Props) {
    const theme = useTheme();

    const sidebarRef = useRef(null);

    const close = () => {
        props.setOpen(false);
    };

    const closeOnEsc = (e: KeyboardEvent) => {
        if (e.key == 'Escape') {
            close();
        }
    };

    useEffect(() => {
        if (props.open) {
            document.addEventListener('keydown', closeOnEsc, false);

            return () => {
                document.removeEventListener('keydown', closeOnEsc, false);
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
            <Overlay open={props.open} onClose={close} />
            <Transition
                nodeRef={sidebarRef}
                mountOnEnter
                unmountOnExit
                in={props.open}
                timeout={theme.transitionDuration}
            >
                {(state) => (
                    <div ref={sidebarRef}>
                        <Wrapper
                            style={{
                                ...sidebarTransitionStyles[state]
                            }}
                        >
                            <CloseButton onClick={close} />
                            {props.children}
                        </Wrapper>
                    </div>
                )}
            </Transition>
        </>
    );
}

import React, { useEffect, useRef } from 'react';
import styled, { useTheme } from 'styled-components';
import { Transition } from 'react-transition-group';
import Overlay from '../../../common/Overlay';
import CloseButton from '../../../common/CloseButton';
import { sidebarOpenState, SidebarType, sidebarTypeState } from '../../../../state/sidebar';
import { useRecoilState, useRecoilValue } from 'recoil';
import Navigation from './navigation';

const Wrapper = styled.div((props) => ({
    position: 'fixed',
    top: 0,
    right: '-500px',
    backgroundColor: props.theme.palette.common.black,
    height: '100%',
    width: 'calc(100% - 40px)',
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

export default function Sidebar() {
    const theme = useTheme();

    const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarOpenState);
    const sidebarType = useRecoilValue(sidebarTypeState);

    const sidebarRef = useRef(null);

    const close = () => {
        setSidebarOpen(false);
    };

    const closeOnEsc = (e: KeyboardEvent) => {
        if (e.key == 'Escape') {
            close();
        }
    };

    useEffect(() => {
        if (sidebarOpen) {
            document.addEventListener('keydown', closeOnEsc, false);

            return () => {
                document.removeEventListener('keydown', closeOnEsc, false);
            };
        }
    }, [sidebarOpen]);

    return (
        <>
            <Overlay open={sidebarOpen} onClose={close} />
            <Transition
                nodeRef={sidebarRef}
                mountOnEnter
                unmountOnExit
                in={sidebarOpen}
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
                            {sidebarType == SidebarType.Navigation ? (
                                <Navigation />
                            ) : sidebarType == SidebarType.PriceListPrinting ? (
                                <></>
                            ) : (
                                <></>
                            )}
                        </Wrapper>
                    </div>
                )}
            </Transition>
        </>
    );
}

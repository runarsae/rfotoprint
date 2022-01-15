import { useEffect, useRef } from 'react';
import { Transition } from 'react-transition-group';
import styled, { useTheme } from 'styled-components';
import { disableScroll, enableScroll } from '../../util/toggleScroll';
import CloseButton from './CloseButton';
import Overlay from './Overlay';

const Wrapper = styled.div((props) => ({
    position: 'fixed',
    top: 0,
    right: 0,
    width: '100%',
    height: '100%',
    zIndex: 12,
    opacity: 0,
    overflow: 'auto',
    padding: '100px 20px 20px 20px',

    [`@media (min-width: ${props.theme.breakpoints.sm}px)`]: {
        padding: '100px 40px 40px 40px'
    }
}));

const Content = styled.div({
    width: '100%',
    minHeight: '100%',
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

const popupTransitionStyles: { [id: string]: React.CSSProperties } = {
    entered: { opacity: 1 }
};

interface Props {
    children: React.ReactNode;
    open: boolean;
    setOpen: (open: boolean) => void;
}

function Popup(props: Props) {
    const theme = useTheme();

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
            <Overlay
                open={props.open}
                onClose={() => {
                    props.setOpen(false);
                }}
            />
            <Transition
                nodeRef={popupRef}
                mountOnEnter
                unmountOnExit
                in={props.open}
                timeout={theme.transitionDuration}
            >
                {(state) => (
                    <Wrapper
                        ref={popupRef}
                        style={{
                            transition: `opacity ${theme.transitionDuration}ms ease-in-out`,
                            ...popupTransitionStyles[state]
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            props.setOpen(false);
                        }}
                    >
                        <CloseButton
                            onClick={() => {
                                props.setOpen(false);
                            }}
                        />
                        <Content>{props.children}</Content>
                    </Wrapper>
                )}
            </Transition>
        </>
    );
}

export default Popup;

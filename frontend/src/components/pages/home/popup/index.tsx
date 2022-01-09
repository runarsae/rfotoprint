import { useEffect, useRef } from 'react';
import { Transition } from 'react-transition-group';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled, { useTheme } from 'styled-components';
import { popupOpenState, PopupType, popupTypeState } from '../../../../state/home/popup';
import { disableScroll, enableScroll } from '../../../../util/toggleScroll';
import CloseButton from '../../../common/CloseButton';
import Overlay from '../../../common/Overlay';
import ProductImagePopup from './ProductImagePopup';
import RetouchingExamplesPopup from './RetouchingExamplesPopup';

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

function Popup() {
    const theme = useTheme();

    const popupRef = useRef(null);

    const [popupOpen, setPopupOpen] = useRecoilState(popupOpenState);
    const popupType = useRecoilValue(popupTypeState);

    useEffect(() => {
        if (popupOpen) {
            disableScroll();
        } else {
            enableScroll();
        }
    }, [popupOpen]);

    return (
        <>
            <Overlay
                open={popupOpen}
                onClose={() => {
                    setPopupOpen(false);
                }}
            />
            <Transition
                nodeRef={popupRef}
                mountOnEnter
                unmountOnExit
                in={popupOpen}
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
                            setPopupOpen(false);
                        }}
                    >
                        <CloseButton
                            onClick={() => {
                                setPopupOpen(false);
                            }}
                        />
                        <Content>
                            {popupType == PopupType.ProductImage ? (
                                <ProductImagePopup />
                            ) : popupType == PopupType.RetouchingExamples ? (
                                <RetouchingExamplesPopup />
                            ) : (
                                <></>
                            )}
                        </Content>
                    </Wrapper>
                )}
            </Transition>
        </>
    );
}

export default Popup;

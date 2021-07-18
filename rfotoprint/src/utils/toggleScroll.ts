import { getScrollbarWidth } from './scrollbarWidth';

export const disableScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    const scrollbarWidth = getScrollbarWidth();

    document.body.style.paddingRight = scrollbarWidth.toString() + 'px';
    document.body.style.overflow = 'hidden';

    window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
    };
};

export const enableScroll = () => {
    window.onscroll = function () {};
    document.body.style.paddingRight = '0px';
    document.body.style.overflow = 'auto';
};

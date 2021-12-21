import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
    palette: {
        primary: {
            main: '#AD8226',
            dark: '#705211'
        },
        error: '#DD1E1E',
        common: {
            black: '#141414',
            white: '#FFFFFF',
            gray: '#F5F5F5'
        },
        text: {
            dark: '#555555',
            light: '#CDCDCD'
        },
        overlay: 'rgba(0, 0, 0, 0.8)',
        horizontalLine: {
            dark: '#363641',
            light: '#DADADA'
        }
    },
    breakpoints: {
        xs: 0,
        sm: 520,
        md: 640,
        lg: 768,
        xl: 1080
    },
    transitionDuration: 150
};

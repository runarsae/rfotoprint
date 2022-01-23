import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
    palette: {
        primary: {
            main: '#AD8226',
            dark: '#705211',
            light: '#c79835'
        },
        error: '#DD1E1E',
        success: '#18A813',
        common: {
            black: '#141414',
            white: '#FFFFFF',
            gray: '#F5F5F5'
        },
        text: {
            dark: '#555555',
            light: '#CDCDCD'
        },
        overlay: 'rgba(0, 0, 0, 0.85)',
        horizontalLine: {
            dark: '#363641',
            light: '#DADADA'
        },
        inputBackground: {
            dark: '#000000',
            light: '#e3e3e3'
        },
        skeleton: {
            background: '#EEEEEE',
            highlight: '#dddddd'
        }
    },
    breakpoints: {
        xxs: 0,
        xs: 375,
        sm: 520,
        md: 640,
        lg: 768,
        xl: 1080
    },
    transitionDuration: 150
};

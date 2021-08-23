import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
    primary: '#AD8226',
    secondary: '#93867F',
    background: {
        darker: '#292B2C',
        dark: '#323536',
        light: '#fffffe',
        main: '#eff0f3'
    },
    title: '#0d0d0d',
    text: '#2a2a2a'
};

export enum Sections {
    Fototjenester = 'Fototjenester',
    Varer = 'Varer',
    Kontakt = 'Kontakt'
}

export const preloadImages = {
    printing: '/img/printing.svg',
    close: '/img/close.svg',
    before: '/img/before.jpg',
    after: '/img/after.jpg'
};

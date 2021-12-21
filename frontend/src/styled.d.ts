import 'styled-components';

interface IPalette {
    main: string;
    light?: string;
    dark?: string;
}

declare module 'styled-components' {
    export interface DefaultTheme {
        palette: {
            primary: IPalette;
            error: string;
            common: {
                black: string;
                white: string;
                gray: string;
            };
            text: {
                dark: string;
                light: string;
            };
            overlay: string;
            horizontalLine: {
                dark: string;
                light: string;
            };
        };
        breakpoints: {
            xs: number;
            sm: number;
            md: number;
            lg: number;
            xl: number;
        };
        transitionDuration: number;
    }
}

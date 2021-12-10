import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import useWindowDimensions from './windowDimensions';

/**
 * Gets the name of the largest breakpoint that the width is above
 * @returns name of breakpoint
 */
export default function useBreakpoint(): string {
    const theme = useTheme();
    const { width } = useWindowDimensions();

    const getBreakpoint = (): string => {
        if (width >= theme.breakpoints.xl) {
            return 'xl';
        } else if (width >= theme.breakpoints.lg) {
            return 'lg';
        } else if (width >= theme.breakpoints.md) {
            return 'md';
        } else if (width >= theme.breakpoints.sm) {
            return 'sm';
        } else {
            return 'xs';
        }
    };

    const [breakpoint, setBreakpoint] = useState<string>(getBreakpoint());

    useEffect(() => {
        setBreakpoint(getBreakpoint());
    }, [width]);

    return breakpoint;
}

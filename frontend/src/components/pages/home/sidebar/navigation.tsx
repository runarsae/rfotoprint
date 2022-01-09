import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled, { useTheme } from 'styled-components';
import { sidebarOpenState } from '../../../../state/home/sidebar';
import useWindowDimensions from '../../../../util/windowDimensions';
import NavigationItem from '../header/navigation/NavigationItem';

const Wrapper = styled.div({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    gap: '16px',
    alignItems: 'center',
    justifyContent: 'center',

    '> :last-child': {
        marginTop: '8px'
    }
});

function Navigation() {
    const theme = useTheme();
    const { width } = useWindowDimensions();

    const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarOpenState);

    useEffect(() => {
        if (sidebarOpen && width >= theme.breakpoints.lg) {
            setSidebarOpen(false);
        }
    }, [width]);

    return (
        <Wrapper>
            <NavigationItem
                section="Fototjenester"
                color="light"
                onClick={() => {
                    setSidebarOpen(false);
                }}
            />
            <NavigationItem
                section="Varer"
                color="light"
                onClick={() => {
                    setSidebarOpen(false);
                }}
            />
            <NavigationItem
                section="Kontakt"
                variant="button"
                color="light"
                onClick={() => {
                    setSidebarOpen(false);
                }}
            />
        </Wrapper>
    );
}

export default Navigation;

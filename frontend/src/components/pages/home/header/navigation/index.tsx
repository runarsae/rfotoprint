import styled, { useTheme } from 'styled-components';
import NavigationItem from './NavigationItem';
import { ReactComponent as Menu } from '../../../../../img/icons/menu.svg';
import useWindowDimensions from '../../../../../util/windowDimensions';
import { useSetRecoilState } from 'recoil';
import { sidebarOpenState, SidebarType, sidebarTypeState } from '../../../../../state/home/sidebar';

const Wrapper = styled.div({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    gap: '32px'
});

const MenuButton = styled.button((props) => ({
    display: 'block',
    width: 'fit-content',
    height: 'fit-content',
    cursor: 'pointer',
    userSelect: 'none',
    outline: 0,
    appearance: 'none',
    border: 'none',
    backgroundColor: 'transparent',
    padding: 0,

    '> svg': {
        width: '32px',
        height: '32px',
        fill: props.theme.palette.common.black,
        transition: 'fill ' + props.theme.transitionDuration + 'ms ease-in-out',

        '@media (hover: hover)': {
            ':hover': {
                fill: '#858585'
            }
        }
    }
}));

function Navigation(): JSX.Element {
    const theme = useTheme();
    const { width } = useWindowDimensions();

    const setSidebarType = useSetRecoilState(sidebarTypeState);
    const setSidebarOpen = useSetRecoilState(sidebarOpenState);

    return (
        <>
            {width >= theme.breakpoints.xl ? (
                <Wrapper>
                    <NavigationItem section="Fototjenester" />
                    <NavigationItem section="Varer" />
                    <NavigationItem section="Kontakt" variant="button" />
                </Wrapper>
            ) : (
                <MenuButton
                    onClick={() => {
                        setSidebarType(SidebarType.Navigation);
                        setSidebarOpen(true);
                    }}
                >
                    <Menu />
                </MenuButton>
            )}
        </>
    );
}

export default Navigation;

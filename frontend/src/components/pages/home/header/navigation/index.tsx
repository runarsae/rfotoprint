import styled, { useTheme } from 'styled-components';
import NavigationItem from './NavigationItem';

const Wrapper = styled.div({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    gap: '32px'
});

function Navigation(): JSX.Element {
    const theme = useTheme();

    return (
        <Wrapper>
            <NavigationItem section="Fototjenester" />
            <NavigationItem section="Varer" />
            <NavigationItem section="Kontakt" variant="button" />
        </Wrapper>
    );
}

export default Navigation;

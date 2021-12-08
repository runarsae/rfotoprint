import styled, { useTheme } from 'styled-components';
import Button from '../../../../common/Button';
import Typography from '../../../../common/Typography';
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
            <Button
                variant="outlined"
                onClick={() => {
                    return null;
                }}
            >
                Kontakt
            </Button>
        </Wrapper>
    );
}

export default Navigation;

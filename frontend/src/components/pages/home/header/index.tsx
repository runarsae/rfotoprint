import styled, { useTheme } from 'styled-components';
import Section from '../../../common/Section';
import Navigation from './navigation';
import logo from '../../../../logo/logo_1_dark.svg';

const Grid = styled.div({
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: '20px',
    alignItems: 'center'
});

const Logo = styled.img({
    height: '80px'
});

function Header() {
    const theme = useTheme();

    return (
        <Section size="small">
            <Grid>
                <Logo src={logo} alt="Rossland Fotoprint" />
                <Navigation />
            </Grid>
        </Section>
    );
}

export default Header;

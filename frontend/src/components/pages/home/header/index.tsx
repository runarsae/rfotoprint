import styled, { useTheme } from 'styled-components';
import Section from '../../../common/Section';
import Navigation from './navigation';
import logo from '../../../../img/logo/logo_1_dark.svg';
import logo_symbol from '../../../../img/logo/logo_symbol.svg';
import useWindowDimensions from '../../../../util/windowDimensions';

const StyledSection = styled(Section)`
    padding: 40px 20px 0px 20px;

    @media (min-width: ${(props) => props.theme.breakpoints.sm}px) {
        padding: 40px 40px;
    }
`;

const Grid = styled.div({
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: '20px',
    alignItems: 'center'
});

const Logo = styled.img((props) => ({
    height: '52px',

    [`@media (min-width: ${props.theme.breakpoints.sm}px)`]: {
        height: '80px'
    }
}));

function Header() {
    const theme = useTheme();
    const { width } = useWindowDimensions();

    return (
        <StyledSection size="small">
            <Grid>
                <Logo
                    src={width >= theme.breakpoints.xs ? logo : logo_symbol}
                    alt="Rossland Fotoprint"
                />
                <Navigation />
            </Grid>
        </StyledSection>
    );
}

export default Header;

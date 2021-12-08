import styled, { useTheme } from 'styled-components';
import Section from '../../../common/Section';
import Typography from '../../../common/Typography';
import Navigation from './navigation';

const Grid = styled.div({
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: '20px',
    alignItems: 'center'
});

function Header() {
    const theme = useTheme();

    return (
        <Section size="small">
            <Grid>
                <div>
                    <Typography variant="h1" fontSize="32px" color={theme.palette.primary.main}>
                        R{' '}
                    </Typography>
                    <Typography variant="h1" fontSize="32px" color={theme.palette.common.black}>
                        Fotoprint
                    </Typography>
                </div>
                <Navigation />
            </Grid>
        </Section>
    );
}

export default Header;

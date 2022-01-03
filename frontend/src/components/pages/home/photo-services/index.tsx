import { useTheme } from 'styled-components';
import Section from '../../../common/Section';
import Typography from '../../../common/Typography';
import Grid from './Grid';

function PhotoServices() {
    const theme = useTheme();

    return (
        <Section name="Fototjenester" color="black">
            <Typography variant="h2" color={theme.palette.common.white} align="center">
                Fototjenester
            </Typography>
            <Grid />
        </Section>
    );
}

export default PhotoServices;

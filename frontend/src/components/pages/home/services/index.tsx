import { useTheme } from 'styled-components';
import Section from '../../../common/Section';
import Typography from '../../../common/Typography';
import Grid from './Grid';
import OtherServices from './OtherServices';

function Services() {
    const theme = useTheme();

    return (
        <>
            <Section name="Tjenester" color="black">
                <Typography variant="h2" color={theme.palette.common.white} align="center">
                    Fototjenester
                </Typography>
                <Grid />
            </Section>
            <Section color="gray">
                <Typography variant="h2" color={theme.palette.common.black} align="center">
                    Andre tjenester
                </Typography>
                <OtherServices />
            </Section>
        </>
    );
}

export default Services;

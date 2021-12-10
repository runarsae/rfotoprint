import styled, { useTheme } from 'styled-components';
import Section from '../../../common/Section';
import Typography from '../../../common/Typography';
import Carousel from './Carousel';

function PhotoServices() {
    const theme = useTheme();

    return (
        <Section name="Fototjenester" color="black">
            <Typography variant="h2" color={theme.palette.common.white} align="center">
                Fototjenester
            </Typography>
            <Carousel />
        </Section>
    );
}

export default PhotoServices;

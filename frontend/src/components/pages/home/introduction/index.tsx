import { Fade } from 'react-awesome-reveal';
import styled, { useTheme } from 'styled-components';
import Section from '../../../common/Section';
import Typography from '../../../common/Typography';

const Grid = styled.div((props) => ({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '40px',
    alignItems: 'center',
    padding: '0 0 40px 0',

    [`@media (min-width: ${props.theme.breakpoints.sm}px)`]: {
        padding: '0 40px 40px 40px'
    },

    [`@media (min-width: ${props.theme.breakpoints.xl}px)`]: {
        padding: '0 60px 40px 60px',
        gridTemplateColumns: '1fr 1fr'
    }
}));

const Information = styled.div((props) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    maxWidth: '510px',

    [`@media (min-width: ${props.theme.breakpoints.xl}px)`]: {
        justifySelf: 'right'
    }
}));

function Introduction() {
    const theme = useTheme();

    return (
        <Section>
            <Grid>
                <Fade triggerOnce duration={2000}>
                    <div>
                        <Typography variant="h1" color={theme.palette.primary.main} inline>
                            Bilder
                        </Typography>
                        <Typography variant="h1" color={theme.palette.common.black} inline>
                            , passfoto &<br />
                            kontorrekvisita
                        </Typography>
                    </div>
                </Fade>
                <Information>
                    <Fade direction="up" triggerOnce>
                        <Typography variant="body1">
                            Rossland Fotoprint er et enkeltpersonforetak hvor jeg tilbyr en rekke
                            tjenester innen foto, i tillegg til salg av kontorrekvisita og rammer.
                            Ta kontakt for avtale eller kjøp.
                        </Typography>
                    </Fade>

                    <div>
                        <Fade direction="up" triggerOnce cascade damping={0.3} delay={350}>
                            <Typography
                                variant="body1"
                                color={theme.palette.primary.main}
                                fontSize="20px"
                            >
                                Velkommen!
                            </Typography>

                            <Typography variant="signature" color={theme.palette.common.black}>
                                Ann Elin
                            </Typography>
                        </Fade>
                    </div>
                </Information>
            </Grid>
        </Section>
    );
}

export default Introduction;

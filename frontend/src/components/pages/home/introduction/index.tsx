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
        gridTemplateColumns: '1fr 1fr'
    }
}));

const Information = styled.div({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    maxWidth: '510px'
});

function Introduction() {
    const theme = useTheme();

    return (
        <Section>
            <Grid>
                <div>
                    <Typography variant="h1" color={theme.palette.primary.main} inline>
                        Bilder
                    </Typography>
                    <Typography variant="h1" color={theme.palette.common.black} inline>
                        , passfoto &<br />
                        kontorrekvisita
                    </Typography>
                </div>
                <Information>
                    <Typography variant="body1">
                        Rossland Fotoprint er et enkeltpersonforetak hvor jeg tilbyr en rekke
                        tjenester innen foto,{' '}
                        {/* deriblant utskrift, passfoto, forstørring, skanning og retusjering,  */}
                        i tillegg til salg av kontorrekvisita og rammer. Ta kontakt for avtale eller
                        kjøp.
                    </Typography>

                    <div>
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
                    </div>
                </Information>
            </Grid>
        </Section>
    );
}

export default Introduction;

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
                    <Typography variant="h1" color={theme.palette.primary.main}>
                        Bilder
                    </Typography>
                    <Typography variant="h1" color={theme.palette.common.black}>
                        , passfoto &<br />
                        kontorrekvisita
                    </Typography>
                </div>
                <Information>
                    <Typography variant="body1">
                        Jeg startet Rossland Fotoprint januar 2020 og kan tilby følgende tjenester:
                        utskrift av bilder, passfoto, forstørring, skanning, forbedring, salg av
                        rammer og kontorrekvisita. Ta kontakt for avtale eller kjøp.
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

import styled, { useTheme } from 'styled-components';
import IconButton from '../../../common/IconButton';
import Line from '../../../common/Line';
import Link from '../../../common/Link';
import Section from '../../../common/Section';
import Typography from '../../../common/Typography';
import AuraAvis from '../../../icons/AuraAvis';
import Facebook from '../../../icons/Facebook';
import Mail from '../../../icons/Mail';
import Phone from '../../../icons/Phone';
import Pin from '../../../icons/Pin';

const Wrapper = styled.div((props) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    margin: '0 auto',

    [`@media (min-width: ${props.theme.breakpoints.sm}px)`]: {
        gap: '48px',
        padding: '0 40px'
    },

    [`@media (min-width: ${props.theme.breakpoints.xl}px)`]: {
        padding: '0 80px'
    }
}));

const Content = styled.div((props) => ({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '40px',

    [`@media (min-width: ${props.theme.breakpoints.lg}px)`]: {
        gridTemplateColumns: '2fr 1fr auto'
    },

    [`@media (min-width: ${props.theme.breakpoints.xl}px)`]: {
        gap: '140px'
    }
}));

const ContentItem = styled.div({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto 1fr',
    gap: '24px'
});

const ContactGrid = styled.div({
    display: 'grid',
    gridTemplateColumns: '24px auto',
    gridAutoRows: '24px',
    gap: '16px 12px',
    alignItems: 'center'
});

const ContactIcon = styled.div({
    width: '20px',
    height: '20px',
    justifySelf: 'center'
});

const MediaWrapper = styled.div({
    display: 'flex',
    gap: '8px'
});

const Copyright = styled.div({
    margin: '0 auto'
});

function Footer() {
    const theme = useTheme();
    return (
        <Section name="Kontakt" color="black">
            <Wrapper>
                <Content>
                    <ContentItem>
                        <div>
                            <Typography
                                variant="h2"
                                color={theme.palette.primary.main}
                                fontSize="28px"
                                inline
                            >
                                R{' '}
                            </Typography>
                            <Typography
                                variant="h2"
                                color={theme.palette.common.white}
                                fontSize="28px"
                                inline
                            >
                                Fotoprint
                            </Typography>
                        </div>
                        <Typography variant="body3" color={theme.palette.text.light}>
                            Hvis du ønsker å benytte deg av fototjenestene jeg tilbyr, kjøpe eller
                            bestille varer, er det bare å ta kontakt.
                        </Typography>
                    </ContentItem>

                    <ContentItem>
                        <Typography variant="h3" color={theme.palette.common.white}>
                            Kontakt
                        </Typography>
                        <ContactGrid>
                            <ContactIcon>
                                <Pin />
                            </ContactIcon>
                            <Typography variant="body3" color={theme.palette.text.light} noWrap>
                                <Link href="https://goo.gl/maps/rFQZ8bsVGzAoq7Sb7" target="_blank">
                                    Jøntelhaugen 12, 6612 Grøa
                                </Link>
                            </Typography>

                            <ContactIcon>
                                <Phone />
                            </ContactIcon>
                            <Typography variant="body3" color={theme.palette.text.light} noWrap>
                                <Link href="tel:+4790284152">+47 902 84 152 </Link>
                            </Typography>

                            <ContactIcon>
                                <Mail />
                            </ContactIcon>
                            <Typography variant="body3" color={theme.palette.text.light} noWrap>
                                <Link href="mailto:r-fotoprint@online.no">
                                    r-fotoprint@online.no
                                </Link>
                            </Typography>
                        </ContactGrid>
                    </ContentItem>

                    <ContentItem>
                        <Typography variant="h3" color={theme.palette.common.white}>
                            Media
                        </Typography>
                        <MediaWrapper>
                            <IconButton
                                title="Facebook"
                                color={theme.palette.common.white}
                                onClick={() => {
                                    window.open(
                                        'https://www.facebook.com/profile.php?id=100063615033077'
                                    );
                                }}
                            >
                                <Facebook />
                            </IconButton>
                            <IconButton
                                title="Aura Avis"
                                color={theme.palette.common.white}
                                onClick={() => {
                                    window.open('https://www.auraavis.no/5-5-276059');
                                }}
                            >
                                <AuraAvis />
                            </IconButton>
                        </MediaWrapper>
                    </ContentItem>
                </Content>

                <Line color="dark" />

                <Copyright>
                    <Typography color={theme.palette.common.white} variant="body3" inline>
                        Copyright &copy; {new Date().getFullYear()},{' '}
                    </Typography>
                    <Typography color={theme.palette.primary.main} variant="body3" inline>
                        R Fotoprint
                    </Typography>
                </Copyright>
            </Wrapper>
        </Section>
    );
}

export default Footer;

import styled from 'styled-components';
import Title from '../components/common/Title';
import Text from '../components/common/Text';
import Section from '../components/common/Section';
import { Fade } from 'react-awesome-reveal';

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    gap: 20px;

    @media (min-width: 768px) {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 339px;
        gap: 120px;
    }
`;

const LandingText = styled(Text)`
    line-height: 1.5;
`;

const LandingImage = styled.img`
    width: 100%;
    height: 100%;
    max-width: 370px;
    display: block;
    margin: auto;
`;

export default function Introduction() {
    return (
        <Section color="light" size="medium">
            <Wrapper>
                <>
                    <div>
                        <Fade direction="up" triggerOnce cascade damping={0.3}>
                            <Title>Bilder, passfoto & kontorrekvisita</Title>
                            <LandingText>
                                Jeg startet Rossland Fotoprint januar 2020 og kan tilby følgende
                                tjenester: utskrift av bilder, passfoto, forstørring, skanning,
                                forbedring, salg av rammer og kontorrekvisita. Ta kontakt for avtale
                                eller kjøp.
                                <br /> <br />
                            </LandingText>

                            <LandingText>
                                Velkommen!
                                <br />
                                <i>Hilsen Ann Elin</i>
                            </LandingText>
                        </Fade>
                    </div>
                    <Fade triggerOnce delay={500} style={{ width: '100%', height: '100%' }}>
                        <LandingImage src="/img/landing.svg" alt="Rossland Fotoprint" />
                    </Fade>
                </>
            </Wrapper>
        </Section>
    );
}

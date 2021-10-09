import { useState } from 'react';
import styled from 'styled-components';
import Title from '../components/common/Title';
import Undertitle from '../components/common/Undertitle';
import Text from '../components/common/Text';
import Section from '../components/common/Section';
import Sidebar from '../components/common/Sidebar';
import Button from '../components/common/Button';
import PriceList from '../components/foto-services/PriceList';
import Popup from '../components/common/Popup';
import ButtonLink from '../components/common/ButtonLink';
import { Fade } from 'react-awesome-reveal';
import ImageExamples from '../components/foto-services/ImageExamples';

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    align-items: flex-start;
    width: 100%;
    gap: 80px;
    padding: 40px 0;

    @media (min-width: 640px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1080px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

const GridItem = styled.div`
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: auto auto 1fr auto;
    gap: 16px;
    height: 100%;

    @media (min-width: 640px) {
        grid-template-rows: auto auto 1fr 34px;
    }
`;

const IconContainer = styled.div`
    display: flex;
    margin: auto;
    background-color: ${(props) => props.theme.background.dark};
    border-radius: 50%;
    width: 90px;
    height: 90px;
    justify-content: center;
    align-items: center;
`;

const Icon = styled.img`
    display: block;
    width: 50px;
    height: 50px;
`;

const Description = styled(Text)`
    margin: auto;
`;

const Price = styled(Text)`
    margin: auto;
    color: ${(props) => props.theme.primary};
    display: block;
    font-weight: bold;
    text-align: center;
`;

export default function FotoServices() {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [popupOpen, setPopupOpen] = useState<boolean>(false);

    return (
        <Section name="Fototjenester" color="main">
            <>
                <Title align="center">Fototjenester</Title>
                <Grid>
                    <Fade
                        triggerOnce
                        cascade
                        duration={600}
                        damping={0.1}
                        style={{ height: '100%' }}
                    >
                        <GridItem>
                            <IconContainer>
                                <Icon src="/img/icons/printer.svg" alt="Printer" />
                            </IconContainer>
                            <Undertitle align="center">Utskrift</Undertitle>
                            <Description align="center">
                                Utskrift av bilder fra e-post, minnebrikke, minnepenn, CD og mobil
                                (husk ledning).
                            </Description>
                            <Button
                                center
                                onClick={(e) => {
                                    setSidebarOpen(true);
                                }}
                            >
                                Prisliste &#187;
                            </Button>
                        </GridItem>
                        <GridItem>
                            <IconContainer>
                                <Icon src="/img/icons/camera.svg" alt="Kamera" />
                            </IconContainer>
                            <Undertitle align="center">Passfoto</Undertitle>
                            <Description align="center">
                                Passfoto tas til nødpass, visum, ledsagerbevis, bankkort etc.
                            </Description>
                            <Price>Kr 250,-</Price>
                        </GridItem>
                        <GridItem>
                            <IconContainer>
                                <Icon src="/img/icons/image-gallery.svg" alt="Galleri" />
                            </IconContainer>
                            <Undertitle align="center">Forstørring</Undertitle>
                            <Description align="center">
                                Forstørring av bilder opp til A3-størrelse.
                            </Description>
                            <Price>Se prisliste for utskrift</Price>
                        </GridItem>
                        <GridItem>
                            <IconContainer>
                                <Icon src="/img/icons/scanner.svg" alt="Skanner" />
                            </IconContainer>
                            <Undertitle align="center">Skanning</Undertitle>
                            <Description align="center">
                                Skanning av gamle og nye bilder.
                            </Description>
                            <Price>Kr 65,- pr. stk</Price>
                        </GridItem>
                        <GridItem>
                            <IconContainer>
                                <Icon src="/img/icons/edit-image.svg" alt="Endre bilde" />
                            </IconContainer>
                            <Undertitle align="center">Forbedring/redigering</Undertitle>
                            <Description align="center">
                                Fjerning av bretter, skader, striper og lignende. Se{' '}
                                <ButtonLink
                                    onClick={() => {
                                        setPopupOpen(true);
                                    }}
                                    closingCondition={popupOpen}
                                >
                                    eksempel
                                </ButtonLink>
                                .
                            </Description>
                            <Price>
                                Fra kr 65,-
                                {/* <div style={{ marginBottom: 8 }}>Enkel redigering kr 65,-</div>
                                Ved behov for mye redigering avtales pris på forhånd */}
                            </Price>
                        </GridItem>
                        <GridItem>
                            <IconContainer>
                                <Icon src="/img/icons/movie.svg" alt="Film" />
                            </IconContainer>
                            <Undertitle align="center">Lysbilder og negativer</Undertitle>
                            <Description align="center">
                                Overføring av lysbilder og negativer til digitale bilder i høy
                                oppløsning.
                            </Description>
                            <Price>Pris etter avtale</Price>
                        </GridItem>
                    </Fade>
                </Grid>

                <Sidebar open={sidebarOpen} closeSidebar={() => setSidebarOpen(false)}>
                    <PriceList />
                </Sidebar>

                <Popup
                    open={popupOpen}
                    onClose={() => {
                        setPopupOpen(false);
                    }}
                >
                    <ImageExamples />
                </Popup>
            </>
        </Section>
    );
}

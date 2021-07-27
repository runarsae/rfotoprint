import { useState } from 'react';
import styled from 'styled-components';
import Title from '../components/common/Title';
import Undertitle from '../components/common/Undertitle';
import Text from '../components/common/Text';
import Section from '../components/common/Section';
import Sidebar from '../components/common/Sidebar';
import { TableWrapper, Table, Th, Td } from '../components/common/Table';
import Button from '../components/common/Button';

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    align-items: flex-start;
    width: 100%;
    gap: 80px 40px;
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

const Image = styled.img`
    position: relative;
    width: 100%;
    height: 250px;
    margin: 40px 0;
`;

const Description = styled(Text)`
    margin: auto;
`;

const Price = styled(Text)`
    margin: auto;
    color: white;
    display: block;
    background-color: ${(props) => props.theme.primary};
    padding: 4px 8px;
    border-radius: 2px;
`;

export default function FotoServices() {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

    return (
        <Section name="Fototjenester" color="main">
            <>
                <Title align="center">Fototjenester</Title>
                <Grid>
                    <GridItem>
                        <IconContainer>
                            <Icon src="/img/icons/printer.svg" />
                        </IconContainer>
                        <Undertitle align="center" margin={0}>
                            Utskrift
                        </Undertitle>
                        <Description align="center">
                            Utskrift av bilder fra e-post, minnebrikke, minnepenn, CD og mobil (husk
                            ledning).
                        </Description>
                        <Button
                            onClick={() => {
                                setSidebarOpen(true);
                            }}
                        >
                            Prisliste &#187;
                        </Button>
                    </GridItem>
                    <GridItem>
                        <IconContainer>
                            <Icon src="/img/icons/camera.svg" />
                        </IconContainer>
                        <Undertitle align="center" margin={0}>
                            Passfoto
                        </Undertitle>
                        <Description align="center">
                            Passfoto tas til nødpass, visum, ledsagerbevis, bankkort etc.
                        </Description>
                        <Price>Kr 250,-</Price>
                    </GridItem>
                    <GridItem>
                        <IconContainer>
                            <Icon src="/img/icons/image-gallery.svg" />
                        </IconContainer>
                        <Undertitle align="center" margin={0}>
                            Forstørring
                        </Undertitle>
                        <Description align="center">
                            Forstørring av bilder opp til A3-størrelse.
                        </Description>
                        <Price>Se prisliste for utskrift.</Price>
                    </GridItem>
                    <GridItem>
                        <IconContainer>
                            <Icon src="/img/icons/scanner.svg" />
                        </IconContainer>
                        <Undertitle align="center" margin={0}>
                            Skanning
                        </Undertitle>
                        <Description align="center">Skanning av gamle og nye bilder.</Description>
                        <Price>Kr 65,- pr. stk</Price>
                    </GridItem>
                    <GridItem>
                        <IconContainer>
                            <Icon src="/img/icons/edit-image.svg" />
                        </IconContainer>
                        <Undertitle align="center" margin={0}>
                            Forbedring
                        </Undertitle>
                        <Description align="center">
                            Fjerning av bretter, skader, striper og lignende.
                        </Description>
                        <Price>Fra kr 65,-</Price>
                    </GridItem>
                    <GridItem>
                        <IconContainer>
                            <Icon src="/img/icons/movie.svg" />
                        </IconContainer>
                        <Undertitle align="center" margin={0}>
                            Lysbilder og negativer
                        </Undertitle>
                        <Description align="center">
                            Overføring av lysbilder og negativer til digitale <br />
                            bilder i høy oppløsning.
                        </Description>
                        <Price>Pris etter avtale.</Price>
                    </GridItem>
                </Grid>

                <Sidebar open={sidebarOpen} closeSidebar={() => setSidebarOpen(false)}>
                    <>
                        <Title color="light" margin={0}>
                            Prisliste
                        </Title>
                        <Undertitle color="gray" margin={0}>
                            Utskrift av bilder
                        </Undertitle>
                        <TableWrapper>
                            <Table>
                                <thead>
                                    <tr>
                                        <Th align="left" fitContent>
                                            Størrelse (cm)
                                        </Th>
                                        <Th>
                                            1-49
                                            <br />
                                            stk
                                        </Th>
                                        <Th>
                                            50+
                                            <br />
                                            stk
                                        </Th>
                                        <Th>
                                            100+
                                            <br />
                                            stk
                                        </Th>
                                        <Th>
                                            200+
                                            <br />
                                            stk
                                        </Th>
                                        <Th>
                                            300+
                                            <br />
                                            stk
                                        </Th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <Td align="left" color="white">
                                            10x13 / 10x15
                                        </Td>
                                        <Td>4,-</Td>
                                        <Td>3,50</Td>
                                        <Td>3,-</Td>
                                        <Td>2,50</Td>
                                        <Td>2,-</Td>
                                    </tr>
                                    <tr>
                                        <Td align="left" color="white">
                                            10x20 / 10x21
                                        </Td>
                                        <Td>12,-</Td>
                                        <Td>10,-</Td>
                                        <Td>8,-</Td>
                                        <Td>6,-</Td>
                                        <Td>5,-</Td>
                                    </tr>
                                    <tr>
                                        <Td align="left" color="white">
                                            13x13 / 15x15
                                        </Td>
                                        <Td>20,-</Td>
                                        <Td>15,-</Td>
                                        <Td>10,-</Td>
                                        <Td>9,-</Td>
                                        <Td>8,-</Td>
                                    </tr>
                                </tbody>
                            </Table>
                        </TableWrapper>
                        <TableWrapper>
                            <Table>
                                <thead>
                                    <tr>
                                        <Th align="left" fitContent>
                                            Størrelse (cm)
                                        </Th>
                                        <Th>
                                            1-4
                                            <br />
                                            stk
                                        </Th>
                                        <Th>
                                            5-9
                                            <br />
                                            stk
                                        </Th>
                                        <Th>
                                            10-19
                                            <br />
                                            stk
                                        </Th>
                                        <Th>
                                            20+
                                            <br />
                                            stk
                                        </Th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <Td align="left" color="white">
                                            13x18 / 15x20
                                        </Td>
                                        <Td>45,-</Td>
                                        <Td>40,-</Td>
                                        <Td>35,-</Td>
                                        <Td>30,-</Td>
                                    </tr>
                                    <tr>
                                        <Td align="left" color="white">
                                            18x18 / 20x20
                                        </Td>
                                        <Td>60,-</Td>
                                        <Td>55,-</Td>
                                        <Td>50,-</Td>
                                        <Td>45,-</Td>
                                    </tr>
                                    <tr>
                                        <Td align="left" color="white">
                                            18x24
                                        </Td>
                                        <Td>75,-</Td>
                                        <Td>70,-</Td>
                                        <Td>65,-</Td>
                                        <Td>60,-</Td>
                                    </tr>
                                    <tr>
                                        <Td align="left" color="white">
                                            20x25 / 20x30
                                        </Td>
                                        <Td>95,-</Td>
                                        <Td>90,-</Td>
                                        <Td>85,-</Td>
                                        <Td>80,-</Td>
                                    </tr>
                                    <tr>
                                        <Td align="left" color="white">
                                            30x40
                                        </Td>
                                        <Td>175,-</Td>
                                    </tr>
                                </tbody>
                            </Table>
                        </TableWrapper>

                        <Image src="/img/printing.svg" />
                    </>
                </Sidebar>
            </>
        </Section>
    );
}

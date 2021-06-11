import styled from 'styled-components';
import Title from '../components/common/Title';
import Undertitle from '../components/common/Undertitle';
import Text from '../components/common/Text';
import Wrapper from '../components/common/Wrapper';
import Sidebar from '../components/common/Sidebar';
import { TableWrapper, Table, Th, Td } from '../components/common/Table';
import { useState } from 'react';

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
    display: flex;
    flex-direction: column;
`;

const IconContainer = styled.div`
    display: flex;
    margin: auto;
    background-color: ${(props) => props.theme.secondary};
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

export default function FotoServices() {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

    return (
        <Wrapper>
            <Title align="center">Fototjenester</Title>
            <Grid>
                <GridItem>
                    <IconContainer>
                        <Icon src="/img/icons/printer.svg" />
                    </IconContainer>
                    <Undertitle align="center">Utskrift</Undertitle>
                    <Text align="center" margin={0}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam nunc justo
                        sagittis suscipit ultrices.
                    </Text>
                    <button
                        onClick={() => {
                            setSidebarOpen(true);
                        }}
                    >
                        Se prisliste.
                    </button>
                </GridItem>
                <GridItem>
                    <IconContainer>
                        <Icon src="/img/icons/camera.svg" />
                    </IconContainer>
                    <Undertitle align="center">Passfoto</Undertitle>
                    <Text align="center" margin={0}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam nunc justo
                        sagittis suscipit ultrices.
                    </Text>
                </GridItem>
                <GridItem>
                    <IconContainer>
                        <Icon src="/img/icons/image-gallery.svg" />
                    </IconContainer>
                    <Undertitle align="center">Fremkalling</Undertitle>
                    <Text align="center" margin={0}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam nunc justo
                        sagittis suscipit ultrices.
                    </Text>
                </GridItem>
                <GridItem>
                    <IconContainer>
                        <Icon src="/img/icons/scanner.svg" />
                    </IconContainer>
                    <Undertitle align="center">Scanning</Undertitle>
                    <Text align="center" margin={0}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam nunc justo
                        sagittis suscipit ultrices.
                    </Text>
                </GridItem>
                <GridItem>
                    <IconContainer>
                        <Icon src="/img/icons/edit-image.svg" />
                    </IconContainer>
                    <Undertitle align="center">Forbedring</Undertitle>
                    <Text align="center" margin={0}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam nunc justo
                        sagittis suscipit ultrices.
                    </Text>
                </GridItem>
                <GridItem>
                    <IconContainer>
                        <Icon src="/img/icons/movie.svg" />
                    </IconContainer>
                    <Undertitle align="center">Dias</Undertitle>
                    <Text align="center" margin={0}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam nunc justo
                        sagittis suscipit ultrices.
                    </Text>
                </GridItem>
            </Grid>

            <Sidebar open={sidebarOpen} closeSidebar={() => setSidebarOpen(false)}>
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
                                <Td>4 kr</Td>
                                <Td>3,5 kr</Td>
                                <Td>3 kr</Td>
                                <Td>2,5 kr</Td>
                                <Td>2 kr</Td>
                            </tr>
                            <tr>
                                <Td align="left" color="white">
                                    10x20 / 10x21
                                </Td>
                                <Td>10 kr</Td>
                                <Td>8 kr</Td>
                                <Td>7 kr</Td>
                                <Td>6 kr</Td>
                                <Td>5 kr</Td>
                            </tr>
                            <tr>
                                <Td align="left" color="white">
                                    13x13 / 15x15
                                </Td>
                                <Td>15 kr</Td>
                                <Td>10 kr</Td>
                                <Td>9 kr</Td>
                                <Td>8 kr</Td>
                                <Td>7 kr</Td>
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
                                <Td>35 kr</Td>
                                <Td>30 kr</Td>
                                <Td>25 kr</Td>
                                <Td>20 kr</Td>
                            </tr>
                            <tr>
                                <Td align="left" color="white">
                                    18x18 / 20x20
                                </Td>
                                <Td>40 kr</Td>
                                <Td>35 kr</Td>
                                <Td>30 kr</Td>
                                <Td>25 kr</Td>
                            </tr>
                            <tr>
                                <Td align="left" color="white">
                                    18x24
                                </Td>
                                <Td>50 kr</Td>
                                <Td>45 kr</Td>
                                <Td>40 kr</Td>
                                <Td>35 kr</Td>
                            </tr>
                            <tr>
                                <Td align="left" color="white">
                                    20x25 / 20x30
                                </Td>
                                <Td>65 kr</Td>
                                <Td>60 kr</Td>
                                <Td>50 kr</Td>
                                <Td>40 kr</Td>
                            </tr>
                            <tr>
                                <Td align="left" color="white">
                                    30x40
                                </Td>
                                <Td>150 kr </Td>
                            </tr>
                        </tbody>
                    </Table>
                </TableWrapper>

                <Image src="/img/printing.svg" />
            </Sidebar>
        </Wrapper>
    );
}

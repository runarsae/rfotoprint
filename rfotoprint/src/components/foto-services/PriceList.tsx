import React from 'react';
import styled from 'styled-components';
import Title from '../common/Title';
import Undertitle from '../common/Undertitle';
import { TableWrapper, Table, Th, Td } from '../common/Table';
import { preloadImages } from '../../constants';

const Image = styled.img`
    position: relative;
    width: 100%;
    height: 250px;
    margin: 40px 0;
`;

function PriceList(): JSX.Element {
    return (
        <>
            <Title color="light" margin={0}>
                Prisliste
            </Title>
            <Undertitle color="gray">Utskrift av bilder</Undertitle>
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

            <Image src={preloadImages.printing} />
        </>
    );
}

export default PriceList;
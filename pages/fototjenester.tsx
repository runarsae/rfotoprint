import styled from 'styled-components';
import Head from 'next/head';
import Title from '../components/common/Title';
import Undertitle from '../components/common/Undertitle';
import Text from '../components/common/Text';
import Wrapper from '../components/common/Wrapper';

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
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
    width: 110px;
    height: 110px;
    justify-content: center;
    align-items: center;
`;

const Icon = styled.img`
    display: block;
    width: 65px;
    height: 65px;
`;

export default function fototjenester() {
    return (
        <>
            <Head>
                <title>Fototjenester - R Fotoprint</title>
            </Head>
            <Wrapper>
                <Title align="center">Fototjenester</Title>
                <Grid>
                    <GridItem>
                        <IconContainer>
                            <Icon src="/img/icons/printer.svg" />
                        </IconContainer>
                        <Undertitle align="center">Utskrift</Undertitle>
                        <Text align="center" margin={0}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit nullam nunc justo sagittis suscipit ultrices.
                        </Text>
                    </GridItem>
                    <GridItem>
                        <IconContainer>
                            <Icon src="/img/icons/camera.svg" />
                        </IconContainer>
                        <Undertitle align="center">Passfoto</Undertitle>
                        <Text align="center" margin={0}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit nullam nunc justo sagittis suscipit ultrices.
                        </Text>
                    </GridItem>
                    <GridItem>
                        <IconContainer>
                            <Icon src="/img/icons/image-gallery.svg" />
                        </IconContainer>
                        <Undertitle align="center">Fremkalling</Undertitle>
                        <Text align="center" margin={0}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit nullam nunc justo sagittis suscipit ultrices.
                        </Text>
                    </GridItem>
                    <GridItem>
                        <IconContainer>
                            <Icon src="/img/icons/scanner.svg" />
                        </IconContainer>
                        <Undertitle align="center">Scanning</Undertitle>
                        <Text align="center" margin={0}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit nullam nunc justo sagittis suscipit ultrices.
                        </Text>
                    </GridItem>
                    <GridItem>
                        <IconContainer>
                            <Icon src="/img/icons/edit-image.svg" />
                        </IconContainer>
                        <Undertitle align="center">Forbedring</Undertitle>
                        <Text align="center" margin={0}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit nullam nunc justo sagittis suscipit ultrices.
                        </Text>
                    </GridItem>
                    <GridItem>
                        <IconContainer>
                            <Icon src="/img/icons/movie.svg" />
                        </IconContainer>
                        <Undertitle align="center">Dias</Undertitle>
                        <Text align="center" margin={0}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit nullam nunc justo sagittis suscipit ultrices.
                        </Text>
                    </GridItem>
                </Grid>
            </Wrapper>
        </>
    );
}

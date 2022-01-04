import useSize from '@react-hook/size';
import { useCallback, useRef, useState } from 'react';
import { Fade, Slide } from 'react-awesome-reveal';
import styled, { useTheme } from 'styled-components';
import useWindowDimensions from '../../../../util/windowDimensions';
import Button from '../../../common/Button';
import Card from '../../../common/Card';
import Section from '../../../common/Section';
import Typography from '../../../common/Typography';
import products from '../../../../img/products.jpg';

const Container = styled.div<{ imageHeight?: number; cardHeight?: number }>((props) => ({
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '40px',
    width: '100%',

    [`@media (min-width: ${props.theme.breakpoints.lg}px)`]: {
        padding: '0 40px',
        ...(props.imageHeight &&
            props.cardHeight && {
                marginBottom: props.cardHeight - (props.imageHeight / 100) * 20 + 'px'
            })
    }
}));

const Image = styled.img((props) => ({
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px',

    [`@media (min-width: ${props.theme.breakpoints.lg}px)`]: {
        boxShadow: '0px 20px 50px 0px rgba(0,0,0,0.06)'
    }
}));

const CardContainer = styled.div((props) => ({
    width: '100%',
    position: 'relative',

    [`@media (min-width: ${props.theme.breakpoints.lg}px)`]: {
        position: 'absolute',
        width: '80%',
        top: '80%',
        left: '10%'
    }
}));

const ContentContainer = styled.div((props) => ({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '32px',
    alignItems: 'center',
    padding: '0px',

    [`@media (min-width: ${props.theme.breakpoints.sm}px)`]: {
        padding: '0px 40px'
    },

    [`@media (min-width: ${props.theme.breakpoints.lg}px)`]: {
        padding: '0px'
    },

    [`@media (min-width: ${props.theme.breakpoints.xl}px)`]: {
        gridTemplateColumns: '1fr auto',
        gap: '60px'
    }
}));

function Content() {
    const theme = useTheme();
    const { width } = useWindowDimensions();

    return (
        <ContentContainer>
            <div>
                <Fade
                    triggerOnce
                    cascade
                    direction="up"
                    damping={0.2}
                    duration={width >= theme.breakpoints.lg ? 0 : 1000}
                >
                    <Typography variant="h2" color={theme.palette.common.black} marginBottom>
                        Varer
                    </Typography>
                    <Typography variant="body1" color={theme.palette.text.dark}>
                        Kontorpapir, skriveredskap, skrivebøker, datatilbehør og diverse
                        kontorutstyr kan skaffes ved behov. Gå til kontorkatalogen for å se hvilke
                        varer jeg kan skaffe.
                    </Typography>
                </Fade>
            </div>
            <Fade
                triggerOnce
                direction="up"
                delay={width >= theme.breakpoints.lg ? 0 : 400}
                duration={width >= theme.breakpoints.lg ? 0 : 1000}
            >
                <Button
                    onClick={() => {
                        window.open('/katalog', '_blank');
                    }}
                >
                    Kontorkatalogen
                </Button>
            </Fade>
        </ContentContainer>
    );
}

function Products() {
    const theme = useTheme();
    const { width } = useWindowDimensions();

    const imageRef = useRef<HTMLImageElement>(null);
    const [, imageHeight] = useSize(imageRef);

    const [card, setCard] = useState<HTMLDivElement | null>(null);
    const cardRef = useCallback((node: HTMLDivElement) => {
        if (node !== null) {
            setCard(node);
        }
    }, []);
    const [, cardHeight] = useSize(card);

    return (
        <Section name="Varer" color="white">
            <Container imageHeight={imageHeight} cardHeight={cardHeight}>
                <Image src={products} alt="Products" ref={imageRef} />

                {width >= theme.breakpoints.lg ? (
                    <CardContainer ref={cardRef}>
                        <Slide triggerOnce direction="up">
                            <Card size="large" shadow>
                                <Content />
                            </Card>
                        </Slide>
                    </CardContainer>
                ) : (
                    <Content />
                )}
            </Container>
        </Section>
    );
}

export default Products;

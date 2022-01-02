import React from 'react';
import styled, { useTheme } from 'styled-components';
import Button from '../../../common/Button';
import Typography from '../../../common/Typography';

const Card = styled.div((props) => ({
    display: 'block',
    flexBasis: 'calc(100%)',
    flexShrink: 0,

    position: 'relative',
    maxWidth: 'calc(100%)',
    height: '380px',

    backgroundColor: 'white',

    scrollSnapAlign: 'start',
    scrollSnapStop: 'always',

    [`@media (min-width: ${props.theme.breakpoints.sm}px)`]: {
        height: '410px',
        flexBasis: 'calc(50% - 8px)',
        maxWidth: 'calc(50% - 8px)'
    },

    [`@media (min-width: ${props.theme.breakpoints.lg}px)`]: {
        flexBasis: 'calc(33.3% - 10.67px)',
        maxWidth: 'calc(33.3% - 10.67px)'
    },

    [`@media (min-width: ${props.theme.breakpoints.xl}px)`]: {
        flexBasis: 'calc(25% - 24px)',
        maxWidth: 'calc(25% - 24px)'
    }
}));

const Image = styled.img({
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center top',
    userSelect: 'none'
});

const Overlay = styled.div((props) => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 'auto',
    backgroundColor: props.theme.palette.overlay,
    padding: '16px',

    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto 1fr 41px',
    gap: '8px',
    justifyItems: 'center',
    alignItems: 'center',

    [`@media (min-width: ${props.theme.breakpoints.sm}px)`]: {
        padding: '16px'
    }
}));

interface Props {
    forwardedRef?: React.RefObject<HTMLDivElement>;
    image: string;
    title: string;
    description: React.ReactNode;
    price?: string;
    priceOnClick?: () => void;
}

function CarouselItem(props: Props) {
    const theme = useTheme();

    return (
        <Card ref={props.forwardedRef}>
            <Image src={props.image} />
            <Overlay>
                <Typography variant="h3" color={theme.palette.common.white} align="center">
                    {props.title}
                </Typography>
                <Typography variant="body3" color={theme.palette.text.light} align="center">
                    {props.description}
                </Typography>
                {props.price ? (
                    <Typography variant="button" color={theme.palette.primary.main} align="center">
                        {props.price}
                    </Typography>
                ) : props.priceOnClick ? (
                    <Button onClick={props.priceOnClick} size="small">
                        Prisliste
                    </Button>
                ) : (
                    <></>
                )}
            </Overlay>
        </Card>
    );
}

export default CarouselItem;

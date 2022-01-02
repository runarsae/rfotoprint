import styled from 'styled-components';
import CarouselItem from './CarouselItem';
import printing from './img/printing.jpg';
import passport_photo from './img/passport_photo.jpg';
import editing from './img/editing.jpg';
import negatives from './img/negatives.jpg';
import resize from './img/resize.jpg';
import scanning from './img/scanning.png';
import { useEffect, useRef, useState } from 'react';
import IconButton from '../../../common/IconButton';
import ArrowRight from '../../../icons/ArrowRight';
import ArrowLeft from '../../../icons/ArrowLeft';
import getBreakpoint from '../../../../util/breakpoint';
import useWindowDimensions from '../../../../util/windowDimensions';
import { useSetRecoilState } from 'recoil';
import { sidebarOpenState, SidebarType, sidebarTypeState } from '../../../../state/sidebar';
import { popupOpenState, PopupType, popupTypeState } from '../../../../state/popup';
import TextButton from '../../../common/TextButton';

interface ICarouselItem {
    title: string;
    image: string;
    description: React.ReactNode;
    price?: string;
    priceOnClick?: () => void;
}

const Container = styled.div((props) => ({
    position: 'relative',
    display: 'flex',
    flex: 'none',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    width: '100%',
    gap: '16px',
    scrollBehavior: 'smooth',
    scrollSnapType: 'x mandatory',
    overflowX: 'scroll',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',

    '::-webkit-scrollbar': {
        display: 'none'
    },

    [`@media (min-width: ${props.theme.breakpoints.xl}px)`]: {
        gap: '32px'
    }
}));

const NavigationContainer = styled.div((props) => ({
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gap: '32px',
    alignItems: 'center',
    margin: 'auto',
    width: 'fit-content'
}));

const pageSizeMap: { [index: string]: number } = {
    xxs: 1,
    xs: 1,
    sm: 2,
    md: 2,
    lg: 3,
    xl: 4
};

const gapSizeMap: { [index: string]: number } = {
    xxs: 16,
    xs: 16,
    sm: 16,
    md: 16,
    lg: 16,
    xl: 32
};

function Carousel() {
    const { width } = useWindowDimensions();
    const breakpoint = getBreakpoint();

    const [page, setPage] = useState<number>(0);

    const containerRef = useRef<HTMLDivElement>(null);

    const cardRef = useRef<HTMLDivElement>(null);

    const setSidebarType = useSetRecoilState(sidebarTypeState);
    const setSidebarOpen = useSetRecoilState(sidebarOpenState);

    const setPopupType = useSetRecoilState(popupTypeState);
    const setPopupOpen = useSetRecoilState(popupOpenState);

    const carouselItems: ICarouselItem[] = [
        {
            title: 'Utskrift',
            image: printing,
            description: 'Bildeutskrift fra e-post, minnebrikke, minnepenn, CD og mobil.',
            priceOnClick: () => {
                setSidebarType(SidebarType.PriceList);
                setSidebarOpen(true);
            }
        },
        {
            title: 'Passfoto',
            image: passport_photo,
            description: 'Passfoto tas til nødpass, visum, ledsagerbevis, bankkort etc.',
            price: 'Kr 250,-'
        },
        {
            title: 'Lysbilder og negativer',
            image: negatives,
            description:
                'Overføring av lysbilder og negativer til digitale bilder i høy oppløsning.',
            price: 'Pris etter avtale'
        },
        {
            title: 'Forstørring',
            image: resize,
            description: 'Forstørring av bilder opp til A3-størrelse.',
            priceOnClick: () => {
                setSidebarType(SidebarType.PriceList);
                setSidebarOpen(true);
            }
        },
        {
            title: 'Skanning',
            image: scanning,
            description: 'Skanning av gamle og nye bilder til digitalt format.',
            price: 'Kr 65,- pr. stk'
        },
        {
            title: 'Retusjering',
            image: editing,
            description: (
                <>
                    Fjerning av bretter, skader, striper og lignende. Se{' '}
                    <TextButton
                        onClick={() => {
                            setPopupType(PopupType.RetouchingExamples);
                            setPopupOpen(true);
                        }}
                    >
                        eksempler
                    </TextButton>
                    .
                </>
            ),
            price: 'Pris etter avtale, fra kr 65,-'
        }
    ];

    /*
     *  Scroll positions for pages (cards)
     */
    const [pageScrollPositions, _setPageScrollPositions] = useState<number[]>([]);
    const pageScrollPositionsRef = useRef(pageScrollPositions);
    const setPageScrollPositions = (data: number[]) => {
        pageScrollPositionsRef.current = data;
        _setPageScrollPositions(data);
    };

    const getPageScrollPositions = (): number[] => {
        const cardSize = cardRef.current!.clientWidth;
        const gapSize = gapSizeMap[breakpoint];

        return Array(carouselItems.length)
            .fill(0)
            .map((_, i) => {
                if (i == 0) {
                    return 0;
                }

                return i * cardSize + i * gapSize;
            });
    };

    useEffect(() => {
        setPageScrollPositions(getPageScrollPositions());
    }, [width]);

    /*
     *  Calcualate which page is shown when manual scroll is finished
     */
    useEffect(() => {
        if (containerRef.current && cardRef.current) {
            let timer: NodeJS.Timeout | null = null;

            // TODO: Event listener should not be fired when buttons are clicked
            containerRef.current?.addEventListener('scroll', () => {
                if (timer !== null) {
                    clearTimeout(timer);
                }

                timer = setTimeout(() => {
                    const scroll = containerRef.current!.scrollLeft;

                    for (let i = 0; i < pageScrollPositionsRef.current.length; i++) {
                        const scrollPosition = pageScrollPositionsRef.current[i];

                        if (scroll > scrollPosition - 5 && scroll < scrollPosition + 5) {
                            setPageCallback(i, false);
                            break;
                        }
                    }
                }, 150);
            });
        }
    }, [containerRef, cardRef]);

    // Scroll and update page state
    const setPageCallback = (page: number, scroll?: boolean) => {
        if (scroll) {
            containerRef.current!.scrollLeft = pageScrollPositions[page];
        }

        setPage(page);
    };

    return (
        <>
            <Container ref={containerRef}>
                {carouselItems.map((item, index) => (
                    <CarouselItem
                        key={index}
                        forwardedRef={index == 0 ? cardRef : undefined}
                        title={item.title}
                        image={item.image}
                        description={item.description}
                        price={item.price}
                        priceOnClick={item.priceOnClick}
                    />
                ))}
            </Container>

            <NavigationContainer>
                <IconButton
                    title={page == 0 ? '' : 'Forrige side'}
                    disabled={page == 0}
                    onClick={() => {
                        if (page >= pageSizeMap[breakpoint]) {
                            setPageCallback(page - pageSizeMap[breakpoint], true);
                        } else {
                            setPageCallback(0, true);
                        }
                    }}
                >
                    <ArrowLeft />
                </IconButton>
                <IconButton
                    title={
                        page == carouselItems.length - pageSizeMap[breakpoint] ? '' : 'Neste side'
                    }
                    disabled={page == carouselItems.length - pageSizeMap[breakpoint]}
                    onClick={() => {
                        if (
                            page + pageSizeMap[breakpoint] >=
                            carouselItems.length - pageSizeMap[breakpoint]
                        ) {
                            setPageCallback(carouselItems.length - pageSizeMap[breakpoint], true);
                        } else {
                            setPageCallback(page + pageSizeMap[breakpoint], true);
                        }
                    }}
                >
                    <ArrowRight />
                </IconButton>
            </NavigationContainer>
        </>
    );
}

export default Carousel;

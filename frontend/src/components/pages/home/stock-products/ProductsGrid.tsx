import styled, { useTheme } from 'styled-components';
import Product from './Product';
import { useRecoilState, useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import {
    pageSizeState,
    popupProductImageState,
    productsState
} from '../../../../state/home/products';
import Typography from '../../../common/Typography';
import { popupOpenState, PopupType, popupTypeState } from '../../../../state/home/popup';
import useWindowDimensions from '../../../../util/windowDimensions';
import { useEffect, useMemo, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import Skeleton from 'react-loading-skeleton';

const Grid = styled.div((props) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridAutoRows: 'minmax(min-content, max-content)',
    gap: '24px',
    width: '100%',

    [`@media (min-width: ${props.theme.breakpoints.sm}px)`]: {
        gap: '24px'
    },

    [`@media (min-width: ${props.theme.breakpoints.lg}px)`]: {
        gridTemplateColumns: 'repeat(3, 1fr)'
    },

    [`@media (min-width: ${props.theme.breakpoints.xl}px)`]: {
        gridTemplateColumns: 'repeat(4, 1fr)'
    }
}));

function ProductsGrid() {
    const theme = useTheme();

    const { width } = useWindowDimensions();

    const productsLoadable = useRecoilValueLoadable(productsState);

    const [pageSize, setPageSize] = useRecoilState(pageSizeState);

    const setPopupProductImage = useSetRecoilState(popupProductImageState);
    const setPopupType = useSetRecoilState(popupTypeState);
    const setPopupOpen = useSetRecoilState(popupOpenState);

    // Change page size based on number of grid cells according to window width
    useEffect(() => {
        if (width >= theme.breakpoints.lg && width < theme.breakpoints.xl) {
            setPageSize(9);
        } else {
            setPageSize(8);
        }
    }, [width]);

    // Count number of loads to trigger fade transition once
    const [loadCount, setLoadCount] = useState<number>(0);

    useEffect(() => {
        if (productsLoadable.state == 'hasValue') setLoadCount((prevCount) => prevCount + 1);
    }, [productsLoadable.state]);

    const loader = useMemo(
        () =>
            Array(pageSize)
                .fill(undefined)
                .map((_, i) => (
                    <Skeleton
                        key={i}
                        width="100%"
                        height={width >= theme.breakpoints.sm ? '307px' : '220px'}
                        baseColor={theme.palette.skeleton.background}
                        highlightColor={theme.palette.skeleton.highlight}
                        borderRadius={0}
                    />
                )),
        [width, pageSize]
    );

    return (
        <>
            {productsLoadable.state == 'loading' ? (
                <Grid>{loader}</Grid>
            ) : productsLoadable.state == 'hasError' ? (
                <Typography align="center" color={theme.palette.error}>
                    {productsLoadable.contents.message}
                </Typography>
            ) : productsLoadable.state == 'hasValue' && productsLoadable.contents.length > 0 ? (
                <Grid>
                    <Fade triggerOnce cascade damping={0.05} duration={loadCount == 1 ? 1000 : 0}>
                        {productsLoadable.contents.map((product, index) => (
                            <Product
                                key={index}
                                product={product}
                                viewImage={() => {
                                    setPopupProductImage(product.image);
                                    setPopupType(PopupType.ProductImage);
                                    setPopupOpen(true);
                                }}
                            />
                        ))}
                    </Fade>
                </Grid>
            ) : (
                <Typography variant="body1" align="center">
                    Ingen varer.
                </Typography>
            )}
        </>
    );
}

export default ProductsGrid;

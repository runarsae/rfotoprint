import styled, { useTheme } from 'styled-components';
import Product from './Product';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
    pageSizeState,
    popupProductImageState,
    productsErrorState,
    productsState
} from '../../../../state/products';
import Typography from '../../../common/Typography';
import { popupOpenState, PopupType, popupTypeState } from '../../../../state/popup';
import useWindowDimensions from '../../../../util/windowDimensions';
import { useEffect } from 'react';

const Grid = styled.div((props) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
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

    const products = useRecoilValue(productsState);
    const productsError = useRecoilValue(productsErrorState);

    const setPageSize = useSetRecoilState(pageSizeState);

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

    return (
        <>
            {productsError ? (
                <Typography align="center" color={theme.palette.error}>
                    {productsError}
                </Typography>
            ) : products && products.length > 0 ? (
                <Grid>
                    {products.map((product, index) => (
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

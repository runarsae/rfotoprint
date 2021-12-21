import styled, { useTheme } from 'styled-components';
import Product from './Product';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
    popupProductImageState,
    productsErrorState,
    productsState
} from '../../../../state/products';
import Typography from '../../../common/Typography';
import { popupOpenState, popupTypeState } from '../../../../state/popup';

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

    const products = useRecoilValue(productsState);
    const productsError = useRecoilValue(productsErrorState);

    const setPopupProductImage = useSetRecoilState(popupProductImageState);
    const setPopupType = useSetRecoilState(popupTypeState);
    const setPopupOpen = useSetRecoilState(popupOpenState);

    return (
        <>
            {productsError ? (
                <Typography variant="body1" align="center" color={theme.palette.error}>
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
                                setPopupType('product-image');
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

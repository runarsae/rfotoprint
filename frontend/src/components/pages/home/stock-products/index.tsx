import { Suspense } from 'react';
import { useTheme } from 'styled-components';
import Section from '../../../common/Section';
import Typography from '../../../common/Typography';
import Filter from './Filter';
import Pagination from './Pagination';
import ProductsGrid from './ProductsGrid';

function StockProducts() {
    const theme = useTheme();

    return (
        <Section name="Lagervarer" color="gray">
            <div>
                <Typography variant="h2" color={theme.palette.common.black} align="center">
                    Lagervarer
                </Typography>

                <div id="products-in-stock"></div>
            </div>

            <Filter />

            <Suspense
                fallback={
                    <Typography variant="body1" align="center">
                        Laster..
                    </Typography>
                }
            >
                <ProductsGrid />
                <Pagination />
            </Suspense>
        </Section>
    );
}

export default StockProducts;

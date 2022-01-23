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
            <ProductsGrid />
            <Pagination />
        </Section>
    );
}

export default StockProducts;

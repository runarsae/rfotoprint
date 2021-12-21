import styled, { useTheme } from 'styled-components';
import { Product as IProduct } from '../../../../api/types';
import Card from '../../../common/Card';
import Line from '../../../common/Line';
import Typography from '../../../common/Typography';

const Content = styled.div({
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplateRows: '1fr auto 50px'
});

const ProductImage = styled.img({
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'block',
    objectFit: 'contain',
    userSelect: 'none',
    padding: '20px',
    cursor: 'zoom-in'
});

const Title = styled.div({
    paddingTop: '8px',
    overflow: 'hidden'
});

interface Props {
    product: IProduct;
    viewImage: () => void;
}

function Product(props: Props) {
    const theme = useTheme();
    return (
        <div>
            <Card containerFill>
                <Content>
                    <ProductImage
                        src={'/uploads/products/' + props.product.image}
                        alt={props.product.name}
                        onClick={props.viewImage}
                    />

                    <Line />

                    <Title>
                        <Typography variant="body3" align="center" color={theme.palette.text.dark}>
                            {props.product.name}
                        </Typography>
                    </Title>
                </Content>
            </Card>
        </div>
    );
}

export default Product;
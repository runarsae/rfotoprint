import { Draggable } from 'react-beautiful-dnd';
import styled, { useTheme } from 'styled-components';
import { Product } from '../../../api/types';
import Typography from '../../common/Typography';
import { ReactComponent as Delete } from '../../../icons/delete.svg';
import { ReactComponent as Edit } from '../../../icons/edit.svg';

const ItemWrapper = styled.div((props) => ({
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '40px 1fr auto',
    alignItems: 'center',
    gap: '16px',
    padding: '8px 16px',
    backgroundColor: props.theme.palette.common.white,
    transition: 'background-color ' + props.theme.transitionDuration + 'ms ease-in-out',
    borderBottom: '1px solid #b1b1b1',

    '@media (hover: hover)': {
        ':hover': {
            backgroundColor: props.theme.palette.common.gray,

            [IconButton]: {
                backgroundColor: props.theme.palette.common.gray
            }
        }
    }
}));

const ItemImage = styled.img({
    display: 'block',
    width: '40px',
    height: '40px',
    backgroundColor: 'white',
    objectFit: 'contain'
});

const IconsGrid = styled.div({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 32px)',
    gap: '8px'
});

const IconButton = styled.button<{ hover?: boolean }>((props) => ({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    padding: '4px',
    outline: 0,
    border: 'none',
    backgroundColor: props.theme.palette.common.white,
    transition: 'background-color ' + props.theme.transitionDuration + 'ms ease-in-out',
    appearance: 'none',

    ...(props.hover && {
        '@media (hover: hover)': {
            ':hover': {
                backgroundColor: '#ad82261f !important'
            }
        }
    })
}));

interface ProductListItemProps {
    product: Product;
    index: number;
    deleteProduct: (id: string) => void;
}

function ProductListItem(props: ProductListItemProps): JSX.Element {
    const theme = useTheme();
    const { product, index } = props;

    return (
        <Draggable draggableId={product._id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <ItemWrapper>
                        <ItemImage src={'uploads/products/' + product.image} alt={product.name} />
                        <Typography fontSize="14px">{product.name}</Typography>
                        {/* {peops.hidden ? (
                            <IconButton hover title="Vis produkt">
                                <VisibilityOff fill={theme.palette.text.dark} />
                            </IconButton>
                        ) : (
                            <IconButton hover title="Skjul produkt">
                                <Visibility fill={theme.palette.text.dark} />
                            </IconButton>
                        )} */}
                        <IconsGrid>
                            <IconButton hover title="Endre produkt">
                                <Edit fill={theme.palette.text.dark} />
                            </IconButton>
                            <IconButton
                                hover
                                title="Slett produkt"
                                onClick={() => props.deleteProduct(props.product._id)}
                            >
                                <Delete fill={theme.palette.text.dark} />
                            </IconButton>
                        </IconsGrid>
                    </ItemWrapper>
                </div>
            )}
        </Draggable>
    );
}

export default ProductListItem;

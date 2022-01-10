import { Draggable } from 'react-beautiful-dnd';
import styled, { useTheme } from 'styled-components';
import { Product } from '../../../api/types';
import Typography from '../../common/Typography';
import { ReactComponent as Delete } from '../../../img/icons/delete.svg';
import { ReactComponent as Edit } from '../../../img/icons/edit.svg';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { popupProductImageState } from '../../../state/panel/products';
import { popupOpenState, PopupType, popupTypeState } from '../../../state/panel/popup';

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
    objectFit: 'contain',
    cursor: 'pointer'
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
    editProduct: (id: string) => void;
    deleteProduct: (id: string) => void;
}

function ProductListItem(props: ProductListItemProps): JSX.Element {
    const theme = useTheme();
    const { product, index } = props;

    const [dragDisabled, setDragDisabled] = useState(false);

    const setPopupProductImage = useSetRecoilState(popupProductImageState);
    const setPopupType = useSetRecoilState(popupTypeState);
    const setPopupOpen = useSetRecoilState(popupOpenState);

    return (
        <Draggable draggableId={product._id} index={index} isDragDisabled={dragDisabled}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <ItemWrapper>
                        <ItemImage
                            src={'uploads/products/' + product.image}
                            alt={product.name}
                            onMouseOver={() => setDragDisabled(true)}
                            onMouseOut={() => setDragDisabled(false)}
                            onClick={() => {
                                setPopupProductImage(product.image);
                                setPopupType(PopupType.ProductImage);
                                setPopupOpen(true);
                            }}
                        />
                        <Typography fontSize="14px">{product.name}</Typography>
                        {/* {props.hidden ? (
                            <IconButton
                                hover
                                title="Vis vare"
                                onMouseOver={() => setDragDisabled(true)}
                                onMouseOut={() => setDragDisabled(false)}
                            >
                                <VisibilityOff fill={theme.palette.text.dark} />
                            </IconButton>
                        ) : (
                            <IconButton
                                hover
                                title="Skjul vare"
                                onMouseOver={() => setDragDisabled(true)}
                                onMouseOut={() => setDragDisabled(false)}
                            >
                                <Visibility fill={theme.palette.text.dark} />
                            </IconButton>
                        )} */}
                        <IconsGrid>
                            <IconButton
                                onMouseOver={() => setDragDisabled(true)}
                                onMouseOut={() => setDragDisabled(false)}
                                hover
                                title="Endre vare"
                                onClick={() => props.editProduct(props.product._id)}
                            >
                                <Edit fill={theme.palette.text.dark} />
                            </IconButton>
                            <IconButton
                                onMouseOver={() => setDragDisabled(true)}
                                onMouseOut={() => setDragDisabled(false)}
                                hover
                                title="Slett vare"
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

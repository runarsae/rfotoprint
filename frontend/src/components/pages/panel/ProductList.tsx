import { useMutation } from 'graphql-hooks';
import { useEffect, useMemo } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import {
    useRecoilRefresher_UNSTABLE,
    useRecoilState,
    useRecoilValue,
    useResetRecoilState,
    useSetRecoilState
} from 'recoil';
import styled, { useTheme } from 'styled-components';
import { DELETE_PRODUCT, EDIT_PRODUCTS_ORDER } from '../../../api/mutations';
import { DefaultResult, MutationEditProductsOrderArgs, Product } from '../../../api/types';
import {
    categoryState,
    editProductIdState,
    productsOrderErrorState,
    productsQueryState,
    productsState
} from '../../../state/panel/products';
import { sidebarOpenState, SidebarType, sidebarTypeState } from '../../../state/panel/sidebar';
import Typography from '../../common/Typography';
import ProductListItem from './ProductListItem';

const DroppableContent = styled.div({
    maxHeight: '100%',
    overflowY: 'auto',
    borderTop: '1px solid #b1b1b1'
});

const reorder = (list: Product[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

function ProductList() {
    const theme = useTheme();
    const category = useRecoilValue(categoryState);
    const [products, setProducts] = useRecoilState(productsState);

    const [productsOrderError, setProductsOrderError] = useRecoilState(productsOrderErrorState);
    const resetProductsOrderError = useResetRecoilState(productsOrderErrorState);

    const productsQuery = useRecoilValue(productsQueryState);
    const refreshProductsQuery = useRecoilRefresher_UNSTABLE(productsQueryState);

    const [editProductsOrder] = useMutation<
        { editProductsOrder: DefaultResult },
        MutationEditProductsOrderArgs
    >(EDIT_PRODUCTS_ORDER);

    const setEditProductId = useSetRecoilState(editProductIdState);

    const setSidebarType = useSetRecoilState(sidebarTypeState);
    const setSidebarOpen = useSetRecoilState(sidebarOpenState);

    const [deleteProduct] = useMutation(DELETE_PRODUCT);

    // On query refresh, update local products state
    useEffect(() => {
        setProducts((prevState) => ({ ...prevState, [category]: productsQuery }));
    }, [productsQuery]);

    const onDragEnd = async (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        resetProductsOrderError();

        const orderedProducts = reorder(
            products[category],
            result.source.index,
            result.destination.index
        );

        setProducts((prevState) => ({ ...prevState, [category]: orderedProducts }));

        const { data } = await editProductsOrder({
            variables: {
                category: category,
                order: orderedProducts.map((product) => product._id)
            }
        });

        if (data) {
            if (!data.editProductsOrder.success && data.editProductsOrder.message) {
                setProductsOrderError(data.editProductsOrder.message);
            }
        } else {
            setProductsOrderError('Systemfeil: Sortering ble ikke endret.');
        }
    };

    const editProductCallback = (id: string) => {
        setEditProductId(id);
        setSidebarType(SidebarType.EditProduct);
        setSidebarOpen(true);
    };

    const deleteProductCallback = (id: string) => {
        deleteProduct({ variables: { _id: id } }).then(() => {
            refreshProductsQuery();
        });
    };

    const productList = useMemo(() => {
        return (
            products[category] &&
            products[category].map((product: Product, index: number) => (
                <ProductListItem
                    key={product._id}
                    product={product}
                    index={index}
                    editProduct={editProductCallback}
                    deleteProduct={deleteProductCallback}
                />
            ))
        );
    }, [products[category]]);

    return (
        <>
            {productsOrderError ? (
                <Typography align="center" color={theme.palette.error}>
                    {productsOrderError}
                </Typography>
            ) : productList && productList.length > 0 ? (
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="list">
                        {(provided) => (
                            <DroppableContent ref={provided.innerRef} {...provided.droppableProps}>
                                {productList}
                                {provided.placeholder}
                            </DroppableContent>
                        )}
                    </Droppable>
                </DragDropContext>
            ) : (
                <Typography variant="body1" align="center">
                    Ingen varer.
                </Typography>
            )}
        </>
    );
}

export default ProductList;

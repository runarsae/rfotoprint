import { FormEvent, memo, useEffect, useMemo, useState } from 'react';
import Title from '../common/Title';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import SubmitButton from '../common/form/SubmitButton';
import { Form } from '../common/form/Form';
import Error from '../common/form/Error';
import { useManualQuery, useMutation } from 'graphql-hooks';
import { PRODUCTS } from '../../api/queries';
import styled from 'styled-components';
import { ChipContainer } from '../../sections/Products';
import Chip from '../common/form/Chip';
import Text from '../common/Text';
import { EDIT_PRODUCTS_ORDER } from '../../api/mutations';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: auto auto 1fr auto;
    gap: 30px;
    overflow: hidden;
`;

interface ProductsPerCategory {
    [key: string]: Product[];
}

const ItemWrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 40px 1fr;
    align-items: center;
    gap: 14px;
    font-size: 14px;
    padding: 14px;
    border-radius: 2px;
    color: #d1d1d1;
    background-color: #404040;
    margin-bottom: 2px;
`;

const ItemImage = styled.img`
    display: block;
    width: 40px;
    height: 40px;
    padding: 2px;
    border-radius: 2px;
    background-color: white;
    object-fit: contain;
`;

interface Product {
    _id: string;
    image: string;
    name: string;
}

interface ProductListItemProps {
    product: Product;
    index: number;
}

function ProductListItem(props: ProductListItemProps): JSX.Element {
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
                        <span>{product.name}</span>
                    </ItemWrapper>
                </div>
            )}
        </Draggable>
    );
}

export const Categories = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
    align-items: center;

    @media (min-width: 375px) {
        grid-template-columns: min-content min-content;
    }
`;

const reorder = (list: Product[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

interface Props {
    onClose: () => void;
    refreshProducts: () => void;
}

function OrderProducts(props: Props) {
    const [category, setCategory] = useState<string>('office-supplies');

    const [initialFetch, setInitialFetch] = useState<boolean>(false);
    const [products, setProducts] = useState<ProductsPerCategory>({});

    const [errorMessage, setErrorMessage] = useState<string>();

    const [fetchProducts] = useManualQuery(PRODUCTS);
    const [editProductsOrder] = useMutation(EDIT_PRODUCTS_ORDER);

    const fetchProductsCallback = () => {
        if (!products[category]) {
            fetchProducts({
                variables: {
                    filter: { category: category },
                    page: 1,
                    pageSize: 0
                }
            }).then((res) => {
                if (res.data && res.data.products) {
                    if (!res.data.products.success) {
                        setErrorMessage(res.data.products.message);
                        return;
                    }

                    const result = res.data.products.data;
                    setProducts((prevState) => ({ ...prevState, [category]: result.products }));
                } else {
                    setErrorMessage('Systemfeil: Kunne ikke laste inn produkter.');
                }
            });
        }
    };

    useEffect(() => {
        if (!initialFetch) {
            fetchProductsCallback();
            setInitialFetch(true);
        }
    }, []);

    const handleCategoryChange = (value: string) => {
        if (category !== value) {
            setCategory(value);
        }
    };

    useEffect(() => {
        if (initialFetch) {
            fetchProductsCallback();
        }
    }, [category]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let success = true;

        for (const [category, productsInCategory] of Object.entries(products)) {
            const { data } = await editProductsOrder({
                variables: {
                    category: category,
                    order: productsInCategory.map((product) => product._id)
                }
            });

            if (data) {
                if (!data.editProductsOrder.success) {
                    setErrorMessage(data.editProductsOrder.message);
                    success = false;
                }
            } else {
                setErrorMessage('Systemfeil: Sortering ble ikke endret.');
                success = false;
            }
        }

        if (success) {
            props.refreshProducts();
            props.onClose();
        }
    };

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const orderedProducts = reorder(
            products[category],
            result.source.index,
            result.destination.index
        );

        setProducts((prevState) => ({ ...prevState, [category]: orderedProducts }));
    };

    const productList = useMemo(() => {
        return (
            products[category] &&
            products[category].map((product: Product, index: number) => (
                <ProductListItem key={product._id} product={product} index={index} />
            ))
        );
    }, [products[category]]);

    return (
        <Wrapper>
            <Title color="light" margin={0}>
                Sorter varer
            </Title>

            <Categories>
                <Text color="white">Kategori:</Text>
                <ChipContainer>
                    <Chip
                        active={category === 'office-supplies'}
                        dark={false}
                        onClick={() => handleCategoryChange('office-supplies')}
                    >
                        Kontorrekvisita
                    </Chip>
                    <Chip
                        active={category === 'frames'}
                        dark={false}
                        onClick={() => handleCategoryChange('frames')}
                    >
                        Rammer
                    </Chip>
                </ChipContainer>
            </Categories>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="list">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            style={{ maxHeight: '100%', overflowY: 'auto' }}
                        >
                            {productList}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            <Form onSubmit={handleSubmit}>
                {errorMessage && <Error>{errorMessage}</Error>}
                <SubmitButton dark value="Lagre sortering" />
            </Form>
        </Wrapper>
    );
}

export default OrderProducts;

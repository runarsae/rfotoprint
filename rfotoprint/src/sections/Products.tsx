import { useContext, useEffect, useRef } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Section from '../components/common/Section';
import Title from '../components/common/Title';
import Text from '../components/common/Text';
import Product from '../components/products/Product';
import Button from '../components/common/Button';
import Undertitle from '../components/common/Undertitle';
import useWindowDimensions from '../utils/windowDimensions';
import { PRODUCTS } from '../api/queries';
import { useManualQuery, useMutation } from 'graphql-hooks';
import { AuthContext } from '../utils/auth';
import { DELETE_PRODUCT } from '../api/mutations';
import Sidebar from '../components/common/Sidebar';
import EditProduct from '../components/panel/EditProduct';
import AddProduct from '../components/panel/AddProduct';
import RoundButton from '../components/common/RoundButton';
import { AddIcon, NextIcon, PreviousIcon } from '../components/common/Icons';
import Chip from '../components/common/form/Chip';
import Popup from '../components/common/Popup';
import { Fade } from 'react-awesome-reveal';

const Supplier = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
    width: 100%;

    @media (min-width: 768px) {
        width: 50%;
    }
`;

const ProductsHeader = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    margin: 80px 0 20px 0;
    padding-top: 40px;
    align-items: center;

    @media (min-width: 640px) {
        gap: 0px;
        grid-template-columns: auto 1fr;
    }
`;

const UndertitleGrid = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 8px;
    align-items: center;
`;

const Categories = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
    align-items: center;

    @media (min-width: 375px) {
        grid-template-columns: min-content min-content;
    }

    @media (min-width: 640px) {
        justify-self: right;
    }
`;

const ChipContainer = styled.div`
    display: grid;
    grid-template-columns: min-content min-content;
    gap: 8px;
    align-items: center;
`;

const ProductsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    width: 100%;

    @media (min-width: 520px) {
        gap: 40px;
    }

    @media (min-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: 1080px) {
        grid-template-columns: repeat(4, 1fr);
    }
`;

const Pagination = styled.div`
    display: grid;
    grid-template-columns: 32px auto 32px;
    justify-content: center;
    align-items: center;
    gap: 16px;
    margin-top: 32px;
`;

const PaginationButton = styled.button`
    width: 32px;
    height: 32px;
    padding: 6px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    background-color: ${(props) => props.theme.background.main};
    transition: background-color 100ms ease-in-out;

    &:disabled {
        cursor: default;
        opacity: 30%;
    }

    &:hover:not(:disabled) {
        background-color: #d9dbdf;
    }
`;

const PageInfo = styled.div`
    font-size: 14px;
`;

const FullImage = styled.img`
    display: block;
    background-color: white;
    padding: 20px;
    max-width: 100%;
    max-height: 100%;
    pointer-events: auto;
    user-select: none;
    box-shadow: rgb(0 0 0 / 5%) 0px 6px 24px 0px, rgb(0 0 0 / 8%) 0px 0px 0px 1px;
    border-radius: 2px;
`;

interface IProducts {
    [key: string]: IProduct;
}

export interface IProduct {
    _id: string;
    name: string;
    description: string;
    url?: string;
    inventory: number;
    image: string;
}

export default function Products() {
    const auth = useContext(AuthContext);

    const [editProductId, setEditProductId] = useState<string>();
    const [editProductSidebarOpen, setEditProductSidebarOpen] = useState<boolean>(false);
    const [addProductSidebarOpen, setAddProductSidebarOpen] = useState<boolean>(false);

    const { width } = useWindowDimensions();

    const [fetchProducts] = useManualQuery(PRODUCTS);
    const [deleteProduct] = useMutation(DELETE_PRODUCT);

    const [initialFetch, setInitialFetch] = useState<boolean>(false);
    const [products, setProducts] = useState<IProducts | null>(null);

    const [category, setCategory] = useState<string>('office-supplies');

    const handleCategoryChange = (value: string) => {
        if (category !== value) {
            setCategory(value);
        }
    };

    const [pageSize, setPageSize] = useState<number>(width >= 768 && width < 1080 ? 9 : 8);

    const [currentPage, _setCurrentPage] = useState<number>(1);
    const [pageCount, _setPageCount] = useState<number>(0);

    // Refs to access state in event listeners
    const currentPageRef = useRef(currentPage);
    const setCurrentPage = (data: number) => {
        currentPageRef.current = data;
        _setCurrentPage(data);
    };

    const pageCountRef = useRef(pageCount);
    const setPageCount = (data: number) => {
        pageCountRef.current = data;
        _setPageCount(data);
    };

    const scrollIntoView = () => document?.getElementById('products-in-stock')?.scrollIntoView();

    const fetchProductsCallback = async (page: number, scroll: boolean, deleteFlag?: boolean) => {
        if (deleteFlag) {
            // Check if last product on page is deleted, and go to previous page if so
            if (products && Object.keys(products).length === 1 && page > 1) {
                page -= 1;
            }
        }

        await fetchProducts({
            variables: {
                filter: { category: category },
                page: page,
                pageSize: pageSize
            }
        }).then((res) => {
            const result = res.data.products.data;
            setProducts(result.products);
            setPageCount(result.pageCount);

            if (scroll) {
                // Scroll only if on smaller devices
                if (width < 1080) {
                    scrollIntoView();
                }
            }

            setCurrentPage(page);
        });
    };

    useEffect(() => {
        if (!initialFetch) {
            fetchProductsCallback(1, false);
            setInitialFetch(true);
        }
    }, []);

    useEffect(() => {
        if (initialFetch) {
            fetchProductsCallback(1, false);
        }
    }, [category]);

    const nextPage = () => {
        if (currentPageRef.current < pageCountRef.current) {
            fetchProductsCallback(currentPageRef.current + 1, true);
        }
    };

    const previousPage = () => {
        if (currentPageRef.current > 1) {
            fetchProductsCallback(currentPageRef.current - 1, true);
        }
    };

    /*
    // Arrow key navigation
    const navigate = (e: KeyboardEvent) => {
        if (e.key == 'ArrowLeft') {
            previousPage();
        } else if (e.key == 'ArrowRight') {
            nextPage();
        }
    };

    useEffect(() => {
        if (pageCount > 0) {
            document.addEventListener('keydown', (e) => navigate(e));

            return () => {
                document.removeEventListener('keydown', (e) => navigate(e));
            };
        }
    }, [pageCount]);
    */

    useEffect(() => {
        if (width >= 768 && width < 1080) {
            setPageSize(9);
        } else {
            setPageSize(8);
        }
    }, [width]);

    useEffect(() => {
        if (initialFetch) {
            fetchProductsCallback(currentPage, false);
        }
    }, [pageSize]);

    const [imagePopupOpen, setImagePopupOpen] = useState<boolean>(false);
    const [popupImage, setPopupImage] = useState<string>();

    return (
        <Section name="Varer" color="light">
            <>
                <Title>Varer</Title>
                <Supplier>
                    <Fade direction="up" triggerOnce cascade damping={0.2}>
                        <Text>
                            Kontorpapir, skriveredskap, skrivebøker, datatilbehør og diverse
                            kontorutstyr kan skaffes ved behov. Gå til kontorkatalogen ved å klikke
                            på knappen nedenfor for å se hvilke varer jeg kan skaffe.
                        </Text>
                        <Button
                            onClick={() => {
                                window.open('/katalog', '_blank');
                            }}
                        >
                            Kontorkatalogen &#187;
                        </Button>
                    </Fade>
                </Supplier>

                <ProductsHeader id="products-in-stock">
                    <UndertitleGrid>
                        <Undertitle>Lagervarer</Undertitle>
                        {auth ? (
                            <RoundButton
                                title="Ny vare"
                                onClick={() => {
                                    setAddProductSidebarOpen(true);
                                }}
                            >
                                <AddIcon fill="#FFFFFF" />
                            </RoundButton>
                        ) : (
                            <div></div>
                        )}
                    </UndertitleGrid>
                    <Categories>
                        <Text>
                            <b>Kategori:</b>
                        </Text>
                        <ChipContainer>
                            <Chip
                                active={category === 'office-supplies'}
                                onClick={() => handleCategoryChange('office-supplies')}
                            >
                                Kontorrekvisita
                            </Chip>
                            <Chip
                                active={category === 'frames'}
                                onClick={() => handleCategoryChange('frames')}
                            >
                                Rammer
                            </Chip>
                        </ChipContainer>
                    </Categories>
                </ProductsHeader>
                {products && pageCount && Object.keys(products).length > 0 ? (
                    <>
                        <ProductsGrid>
                            {Object.entries(products).map(([id, product]) => (
                                <Product
                                    key={id}
                                    product={product}
                                    authenticated={auth}
                                    editProduct={() => {
                                        setEditProductId(product._id);
                                        setEditProductSidebarOpen(true);
                                    }}
                                    deleteProduct={() => {
                                        deleteProduct({ variables: { _id: product._id } }).then(
                                            () => fetchProductsCallback(currentPage, false, true)
                                        );
                                    }}
                                    viewImage={() => {
                                        setPopupImage(product.image);
                                        setImagePopupOpen(true);
                                    }}
                                />
                            ))}
                        </ProductsGrid>
                        <Pagination>
                            <PaginationButton
                                disabled={currentPage == 1}
                                onClick={previousPage}
                                title="Forrige side"
                            >
                                <PreviousIcon fill={'#000000'} size={20} />
                            </PaginationButton>
                            <PageInfo>
                                {currentPage} / {pageCount}
                            </PageInfo>
                            <PaginationButton
                                disabled={currentPage == pageCount}
                                onClick={nextPage}
                                title="Neste side"
                            >
                                <NextIcon fill={'#000000'} size={20} />
                            </PaginationButton>
                        </Pagination>
                    </>
                ) : (
                    <Text>Ingen varer.</Text>
                )}

                <Sidebar
                    open={addProductSidebarOpen}
                    closeSidebar={() => setAddProductSidebarOpen(false)}
                >
                    <AddProduct refreshProducts={() => fetchProductsCallback(currentPage, false)} />
                </Sidebar>

                <Sidebar
                    open={editProductSidebarOpen}
                    closeSidebar={() => setEditProductSidebarOpen(false)}
                >
                    {editProductId ? (
                        <EditProduct
                            productId={editProductId}
                            onClose={() => setEditProductSidebarOpen(false)}
                            refreshProducts={() => fetchProductsCallback(currentPage, false)}
                        />
                    ) : (
                        <></>
                    )}
                </Sidebar>

                <Popup
                    open={imagePopupOpen}
                    onClose={() => {
                        setImagePopupOpen(false);
                    }}
                >
                    <FullImage
                        src={
                            process.env.REACT_APP_SERVER_ADDRESS + '/uploads/products/' + popupImage
                        }
                        alt="Product"
                    />
                </Popup>
            </>
        </Section>
    );
}

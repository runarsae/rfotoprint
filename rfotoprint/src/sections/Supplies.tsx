import { useContext, useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Section from '../components/common/Section';
import Title from '../components/common/Title';
import Text from '../components/common/Text';
import Product from '../components/supplies/Product';
import Button from '../components/common/Button';
import Undertitle from '../components/common/Undertitle';
import useWindowDimensions from '../utils/windowDimensions';
import { PRODUCTS } from '../api/queries';
import { useMutation, useQuery } from 'graphql-hooks';
import { AuthContext } from '../utils/auth';
import { DELETE_PRODUCT } from '../api/mutations';
import Sidebar from '../components/common/Sidebar';
import EditProduct from '../components/panel/EditProduct';

const SupplierGrid = styled.div`
    display: grid;
    grid-template-columns: 100%;
    gap: 20px;
    align-items: center;

    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const SupplierButton = styled(Button)`
    height: 35px;
`;

const SuppliesGrid = styled.div`
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

export default function Supplies() {
    const auth = useContext(AuthContext);

    const [editProductId, setEditProductId] = useState<string>();
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

    const { width } = useWindowDimensions();

    const { loading, error, data } = useQuery(PRODUCTS);
    const [deleteProduct] = useMutation(DELETE_PRODUCT);

    const [products, setProducts] = useState<IProducts | null>(null);

    useEffect(() => {
        if (data && data.products.data) {
            setProducts(data.products.data);
        }
    }, [data]);

    return (
        <Section name="Varer" color="light">
            <>
                <Title>Varer</Title>
                <SupplierGrid>
                    <Text>
                        Kontorrekvisita kan skaffes ved behov. Gå til kontorkatalogen ved å klikke
                        på knappen {width >= 768 ? 'til høyre' : 'nedenfor'} for å se hvilke varer
                        jeg kan skaffe.
                    </Text>
                    <div>
                        <SupplierButton
                            onClick={() => {
                                window.open(
                                    'https://ekstranett.emo.no/kataloger/katalog1/',
                                    '_blank'
                                );
                            }}
                        >
                            Til kontorkatalogen &#187;
                        </SupplierButton>
                    </div>
                </SupplierGrid>

                {!(loading || error) && (
                    <>
                        <Undertitle margin="40px 0 20px 0">Lagervarer</Undertitle>
                        <SuppliesGrid>
                            {products ? (
                                Object.entries(products).map(([id, product]) => (
                                    <Product
                                        key={id}
                                        product={product}
                                        authenticated={auth}
                                        editProduct={() => {
                                            setEditProductId(product._id);
                                            setSidebarOpen(true);
                                        }}
                                        deleteProduct={() => {
                                            deleteProduct({ variables: { _id: product._id } });
                                            // TODO: Refresh products
                                        }}
                                    />
                                ))
                            ) : (
                                <div>Ingen varer.</div>
                            )}
                        </SuppliesGrid>
                    </>
                )}
                <Sidebar open={sidebarOpen} closeSidebar={() => setSidebarOpen(false)}>
                    {editProductId ? (
                        <EditProduct
                            productId={editProductId}
                            onClose={() => setSidebarOpen(false)}
                        />
                    ) : (
                        <></>
                    )}
                </Sidebar>
            </>
        </Section>
    );
}

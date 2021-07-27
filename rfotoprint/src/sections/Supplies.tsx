import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Section from '../components/common/Section';
import Title from '../components/common/Title';
import Product from '../components/supplies/Product';

const Grid = styled.div`
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

interface IProduct {
    id: string;
    name: string;
    description: string;
    url?: string;
    inventory: number;
    extension: string;
}

export default function Supplies() {
    const [products, setProducts] = useState<IProducts | null>(null);

    useEffect(() => {}, []);

    return (
        <Section name="Varer" color="light">
            <div>
                <Title>Varer</Title>
                <Grid>
                    {products ? (
                        Object.entries(products).map(([id, product]) => (
                            <Product
                                key={id}
                                id={id}
                                name={product.name}
                                description={product.description}
                                inventory={product.inventory}
                                url={product.url}
                                extension={product.extension}
                            />
                        ))
                    ) : (
                        <div>Ingen varer.</div>
                    )}
                </Grid>
            </div>
        </Section>
    );
}

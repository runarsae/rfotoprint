import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IProduct } from '../../sections/Supplies';
import Card from '../common/Card';
import Text from '../common/Text';

const Content = styled.div`
    width: 100%;
    height: 100%;
`;

const ProductImage = styled.img`
    position: relative;
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
`;

const Link = styled.a`
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: ${(props) => props.theme.background.dark};
`;

const LinkImage = styled.img`
    display: block;
    width: 32px;
    height: 32px;
    padding: 8px;
    filter: invert(100%);
`;

const ProductTitle = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 32px;
    margin: 8px 0;

    font-size: 14px;
    font-weight: bold;

    @media (min-width: 520px) {
        height: 38px;
    }
`;

const Name = styled(Text)`
    font-size: 14px;
    font-weight: bold;

    @media (min-width: 520px) {
        font-size: 16px;
    }
`;

const Inventory = styled(Text)`
    font-size: 12px;

    @media (min-width: 520px) {
        font-size: 16px;
    }
`;

interface Props {
    product: IProduct;
}

export default function Product(props: Props) {
    return (
        <div>
            <Card>
                <Content>
                    <ProductImage
                        src={
                            process.env.REACT_APP_SERVER_ADDRESS +
                            '/uploads/supplies/' +
                            props.product.image
                        }
                        alt={props.product.name}
                    />
                    {props.product.url && (
                        <Link href={props.product.url} target="_blank" title="Til leverandør">
                            <LinkImage src="/img/link.svg" />
                        </Link>
                    )}
                </Content>
            </Card>

            <ProductTitle>
                <Name>{props.product.name}</Name>
            </ProductTitle>

            {/* <Inventory>På lager: {props.inventory} stk</Inventory> */}
        </div>
    );
}

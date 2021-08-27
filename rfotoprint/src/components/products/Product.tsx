import styled from 'styled-components';
import { IProduct } from '../../sections/Products';
import Card from '../common/Card';
import { DeleteIcon, EditIcon } from '../common/Icons';
import Text from '../common/Text';

const Content = styled.div`
    width: 100%;
    height: 100%;
    cursor: zoom-in;
`;

const ProductImage = styled.img`
    position: relative;
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
    user-select: none;
`;

const Actions = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    display: grid;
    grid-template-columns: 32px 32px;
`;

const Action = styled.button`
    display: block;
    padding: 4px;
    height: 32px;
    width: 32px;
    border: none;
    background-color: ${(props) => props.theme.background.dark};
    transition: background-color 100ms ease-in-out;
    cursor: pointer;
    pointer-events: all;

    &:hover {
        background-color: #636566;
    }
`;

const ProductTitle = styled.div`
    width: 100%;
    max-height: 32px;
    margin: 8px 0;
    overflow: hidden;
    color: ${(props) => props.theme.text};
    font-size: 14px;
    font-weight: bold;

    @media (min-width: 520px) {
        max-height: 38px;
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
    authenticated: boolean;
    editProduct: () => void;
    deleteProduct: () => void;
    viewImage: () => void;
}

export default function Product(props: Props) {
    return (
        <div>
            <Card onClick={props.viewImage}>
                <Content>
                    <ProductImage
                        src={'/uploads/products/' + props.product.image}
                        alt={props.product.name}
                    />
                    {props.authenticated && (
                        <Actions>
                            <Action
                                title="Endre vare"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    props.editProduct();
                                }}
                            >
                                <EditIcon fill="#FFFFFF" />
                            </Action>
                            <Action
                                title="Slett vare"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    props.deleteProduct();
                                }}
                            >
                                <DeleteIcon fill="#FFFFFF" />
                            </Action>
                        </Actions>
                    )}
                </Content>
            </Card>

            <ProductTitle>{props.product.name}</ProductTitle>

            {/* <Inventory>På lager: {props.inventory} stk</Inventory> */}
        </div>
    );
}

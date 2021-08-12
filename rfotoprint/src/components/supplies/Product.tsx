import { useMutation } from 'graphql-hooks';
import styled from 'styled-components';
import { DELETE_PRODUCT } from '../../api/mutations';
import { IProduct } from '../../sections/Supplies';
import Card from '../common/Card';
import { DeleteIcon, EditIcon } from '../common/Icons';
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

    &:hover {
        background-color: #636566;
    }
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
    authenticated: boolean;
    deleteProduct: () => void;
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
                    {props.authenticated && (
                        <Actions>
                            <Action
                                title="Endre vare"
                                onClick={() => {
                                    // TODO: Go to /endre-vare/:id
                                    return null;
                                }}
                            >
                                <EditIcon fill="#FFFFFF" />
                            </Action>
                            <Action title="Slett vare" onClick={props.deleteProduct}>
                                <DeleteIcon fill="#FFFFFF" />
                            </Action>
                        </Actions>
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

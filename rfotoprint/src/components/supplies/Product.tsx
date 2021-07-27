import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../common/Card';
import Text from '../common/Text';

// TODO: Environment variable
const BACKEND_URL = 'http://localhost:4000';

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
    id: string;
    name: string;
    description: string;
    url?: string;
    inventory: number;
    extension: string;
}

export default function Product(props: Props) {
    const [imgUrl, setImgUrl] = useState<string | null>(null);
    const [imgNotFound, setImgNotFound] = useState<boolean>(false);

    useEffect(() => {
        setImgUrl(BACKEND_URL + '/uploads/supplies/' + props.id + '.' + props.extension);
    }, []);

    return (
        <div>
            <Card>
                <Content>
                    {imgUrl && <ProductImage src={imgUrl} alt={props.name} />}
                    {imgNotFound && <div>ERROR: Bilde ikke funnet.</div>}
                    {props.url && (
                        <Link href={props.url} target="_blank" title="Til leverandør">
                            <LinkImage src="/img/link.svg" />
                        </Link>
                    )}
                </Content>
            </Card>

            <ProductTitle>
                <Name>{props.name}</Name>
            </ProductTitle>

            {/* <Inventory>På lager: {props.inventory} stk</Inventory> */}
        </div>
    );
}

import { useState } from 'react';
import styled from 'styled-components';

const Content = styled.div({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

const FullImage = styled.img<{ loaded: boolean }>((props) => ({
    display: props.loaded ? 'block' : 'none',
    backgroundColor: props.theme.palette.common.white,
    padding: '20px',
    maxWidth: '100%',
    maxHeight: '100%',
    pointerEvents: 'auto',
    userSelect: 'none',
    boxShadow: 'rgb(0 0 0 / 5%) 0px 6px 24px 0px, rgb(0 0 0 / 8%) 0px 0px 0px 1px'
}));

interface Props {
    image: string | null;
}

function ProductImagePopup(props: Props) {
    const [loaded, setLoaded] = useState<boolean>(false);

    return (
        <Content>
            <FullImage
                loaded={loaded}
                onClick={(e) => {
                    e.stopPropagation();
                }}
                src={'/uploads/products/original/' + props.image}
                alt="Product"
                onLoad={() => {
                    setLoaded(true);
                }}
            />
        </Content>
    );
}

export default ProductImagePopup;

import styled from 'styled-components';

const FullImage = styled.img((props) => ({
    display: 'block',
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
    return (
        <FullImage
            onClick={(e) => {
                e.stopPropagation();
            }}
            src={'/uploads/products/' + props.image}
            alt="Product"
        />
    );
}

export default ProductImagePopup;

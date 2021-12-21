import styled from 'styled-components';

type Size = 'normal' | 'large';

const Card = styled.div<{ size?: Size; shadow?: boolean; containerFill?: boolean }>((props) => ({
    display: 'block',
    padding: props.size == 'large' ? '50px 85px' : '20px',
    backgroundColor: props.theme.palette.common.white,
    boxShadow: props.shadow ? 'rgba(0, 0, 0, 0.15) 0px 2px 8px' : 'none',
    ...(props.containerFill && { width: '100%', height: '100%' })
}));

export default Card;

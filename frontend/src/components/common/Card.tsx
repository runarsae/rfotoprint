import styled from 'styled-components';

type Size = 'normal' | 'large';

const Card = styled.div<{ size?: Size }>((props) => ({
    display: 'block',
    padding: props.size == 'large' ? '50px 85px' : '0px',
    backgroundColor: props.theme.palette.common.white,
    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px'
}));

export default Card;

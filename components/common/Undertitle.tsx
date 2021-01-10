import styled from 'styled-components';

const Undertitle = styled.h2<{ align?: 'left' | 'center' | 'right' }>`
    text-align: ${(props) => (props.align ? props.align : 'left')};
    color: ${(props) => props.theme.title};
    font-size: 24px;
    font-weight: normal;
`;

export default Undertitle;

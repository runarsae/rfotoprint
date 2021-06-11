import styled from 'styled-components';

const Undertitle = styled.h2<{
    align?: 'left' | 'center' | 'right';
    color?: 'light' | 'gray';
    margin?: number;
    capitalize?: boolean;
}>`
    text-align: ${(props) => (props.align ? props.align : 'left')};
    color: ${(props) =>
        props.color && props.color === 'light'
            ? 'white'
            : props.color === 'gray'
            ? '#999999'
            : props.theme.title};
    font-size: 24px;
    font-weight: normal;
    ${(props) => props.capitalize && 'text-transform: capitalize;'}
    ${(props) => (props.margin || props.margin === 0) && 'margin: ' + props.margin + 'px 0;'}
`;

export default Undertitle;

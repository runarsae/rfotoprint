import styled from 'styled-components';

const Title = styled.h1<{
    align?: 'left' | 'center' | 'right';
    color?: 'light';
    margin?: number;
}>`
    text-align: ${(props) => (props.align ? props.align : 'left')};
    color: ${(props) => (props.color === 'light' ? 'white' : props.theme.title)};
    font-weight: bold;
    font-size: 34px;
    transition: font-size 0.2s ease-in-out;

    ${(props) => (props.margin || props.margin === 0) && 'margin: ' + props.margin + 'px 0;'}
`;

export default Title;

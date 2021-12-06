import styled from 'styled-components';

const Text = styled.span<{ align?: 'left' | 'center' | 'right'; color?: string }>`
    text-align: ${(props) => (props.align ? props.align : 'left')};
    color: ${(props) => (props.color ? props.color : props.theme.text)};
    font-size: 18px;
`;

export default Text;

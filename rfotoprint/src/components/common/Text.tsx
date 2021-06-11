import styled from 'styled-components';

const Text = styled.p<{ align?: 'left' | 'center' | 'right'; margin?: Number }>`
    text-align: ${(props) => (props.align ? props.align : 'left')};
    color: ${(props) => props.theme.text};
    font-size: 18px;
    ${(props) =>
        (props.margin || props.margin === 0) &&
        'margin-top: ' + props.margin + 'px; margin-bottom: ' + props.margin + 'px;'}
`;

export default Text;

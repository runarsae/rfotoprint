import styled from 'styled-components';

const Label = styled.label<{ dark?: boolean }>`
    display: block;
    margin-bottom: 4px;
    font-weight: bold;
    letter-spacing: 1px;
    color: ${(props) => (props.dark ? '#909090' : 'black')};
`;

export default Label;

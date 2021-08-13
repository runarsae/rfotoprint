import styled from 'styled-components';

const Select = styled.select<{ dark?: boolean }>`
    display: block;
    width: 100%;
    padding: 14px;
    font-size: 16px;
    outline: none;
    border: none;
    border-radius: 2px;
    color: ${(props) => (props.dark ? 'white' : 'black')};
    background-color: ${(props) => (props.dark ? '#404040' : '#e4e4e4')};
    cursor: pointer;
`;

export default Select;
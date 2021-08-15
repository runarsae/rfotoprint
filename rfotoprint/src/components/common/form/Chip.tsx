import styled from 'styled-components';

const Chip = styled.button<{ active: boolean }>`
    border: none;
    border-radius: 17px;
    font-size: 16px;
    height: 34px;
    width: fit-content;
    padding: 8px 16px;
    cursor: pointer;
    color: ${(props) => props.theme.text};
    background-color: ${(props) => (props.active ? '#caa557' : props.theme.background.main)};
    transition: background-color 100ms ease-in-out, color 100ms ease-in-out;

    &:hover {
        ${(props) => !props.active && 'background-color: #d9dbdf;'}
    }
`;

export default Chip;

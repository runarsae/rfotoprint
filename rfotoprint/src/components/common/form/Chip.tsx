import styled from 'styled-components';

const Chip = styled.button<{ active: boolean }>`
    border: none;
    border-radius: 2px;
    font-size: 16px;
    height: 34px;
    width: fit-content;
    padding: 8px 16px;
    cursor: pointer;
    color: ${(props) => (props.active ? 'white' : props.theme.text)};
    background-color: ${(props) => (props.active ? '#caa557' : props.theme.background.main)};
    transition: background-color 100ms ease-in-out, color 100ms ease-in-out;
    box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset;

    &:hover {
        ${(props) => !props.active && 'background-color: #d9dbdf;'}
    }
`;

export default Chip;

import styled from 'styled-components';

const Chip = styled.button<{ active: boolean; dark: boolean }>`
    border: none;
    border-radius: 2px;
    font-size: 16px;
    height: 34px;
    width: fit-content;
    padding: 8px 16px;
    cursor: ${(props) => (props.active ? 'default' : 'pointer')};
    color: ${(props) =>
        props.dark
            ? props.active // Dark theme
                ? 'white'
                : props.theme.text
            : 'white'};
    background-color: ${(props) =>
        props.dark
            ? props.active // Dark theme
                ? props.theme.background.dark
                : props.theme.background.main
            : props.active // Light theme
            ? props.theme.primary
            : '#404040'};
    transition: background-color 100ms ease-in-out, color 100ms ease-in-out;

    &:hover {
        ${(props) =>
            !props.active &&
            (props.dark ? 'background-color: #d9dbdf;' : 'background-color: #4e4e4e;')}
    }
`;

export default Chip;

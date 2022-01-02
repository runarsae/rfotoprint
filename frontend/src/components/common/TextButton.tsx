import styled from 'styled-components';

const TextButton = styled.button((props) => ({
    font: 'inherit',
    color: 'inherit',
    cursor: 'pointer',
    userSelect: 'none',
    outline: 0,
    appearance: 'none',
    backgroundColor: 'transparent',
    border: 'none',
    textDecoration: 'underline',
    padding: 0,
    margin: 0,
    transition: 'color ' + props.theme.transitionDuration + 'ms ease-in-out',

    '@media (hover: hover)': {
        ':hover': {
            color: props.theme.palette.primary.main
        }
    }
}));

export default TextButton;

import styled from 'styled-components';

const IconButton = styled.button((props) => ({
    width: '48px',
    height: '48px',
    padding: '11px',
    borderRadius: '50%',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: '1px solid' + props.theme.palette.primary.main,
    transition: 'background-color ' + props.theme.transitionDuration + 'ms ease-in-out',

    '&:disabled': {
        cursor: 'default',
        opacity: '30%'
    },

    '&:hover:not(:disabled)': {
        backgroundColor: '#ad82261f'
    },

    '&> svg': {
        fill: props.theme.palette.primary.main
    }
}));

export default IconButton;

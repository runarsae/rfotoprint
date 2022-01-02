import styled from 'styled-components';

const IconButton = styled.button<{ color?: string }>((props) => ({
    width: '48px',
    height: '48px',
    padding: '11px',
    borderRadius: '50%',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: props.color ? props.color : props.theme.palette.primary.main,
    transition: 'background-color ' + props.theme.transitionDuration + 'ms ease-in-out',

    ':disabled': {
        cursor: 'default',
        opacity: '30%'
    },

    ':hover:not(:disabled)': {
        backgroundColor: props.color ? '#cdcdcd1f' : '#ad82261f'
    },

    '> svg': {
        fill: props.color ? props.color : props.theme.palette.primary.main
    }
}));

export default IconButton;

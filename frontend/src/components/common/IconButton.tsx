import styled from 'styled-components';

const IconButton = styled.button<{ color?: string }>((props) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48px',
    height: '48px',
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

    '@media (hover: hover)': {
        ':hover:not(:disabled)': {
            backgroundColor: props.color ? '#cdcdcd1f' : '#ad82261f'
        }
    },

    '> svg': {
        fill: props.color ? props.color : props.theme.palette.primary.main
    }
}));

export default IconButton;

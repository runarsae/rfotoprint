import styled from 'styled-components';
import Close from '../icons/Close';

const Button = styled.button((props) => ({
    display: 'block',
    position: 'absolute',
    top: '40px',
    right: '20px',
    pointerEvents: 'auto',
    userSelect: 'none',

    width: '32px',
    height: '32px',

    backgroundColor: 'transparent',
    padding: 0,
    margin: 0,
    border: 'none',
    WebkitAppearance: 'none',

    opacity: 1,
    transition: 'opacity ' + props.theme.transitionDuration + 'ms ease-in-out',

    '&> svg': {
        fill: props.theme.palette.common.white
    },

    '@media (hover: hover)': {
        ':hover': {
            cursor: 'pointer',
            opacity: 0.5
        }
    },

    [`@media (min-width: ${props.theme.breakpoints.sm}px)`]: {
        right: '40px'
    }
}));

interface Props {
    onClick: () => void;
}

export default function CloseButton(props: Props) {
    return (
        <Button onClick={props.onClick}>
            <Close />
        </Button>
    );
}

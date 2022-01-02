import styled from 'styled-components';

const Link = styled.a((props) => ({
    color: 'inherit',
    textDecoration: 'none',
    transition: 'color ' + props.theme.transitionDuration + 'ms ease-in-out',

    ':hover': {
        color: props.theme.palette.primary.main
    }
}));

export default Link;

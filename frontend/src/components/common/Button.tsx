import React from 'react';
import styled, { useTheme } from 'styled-components';
import Typography from './Typography';

type ButtonVariant = 'contained' | 'outlined';
type Size = 'small' | 'large';

const Container = styled.button<{ variant?: ButtonVariant; size?: Size }>((props) => ({
    display: 'block',
    width: 'fit-content',
    cursor: 'pointer',
    userSelect: 'none',
    padding: props.size == 'small' ? '4px 24px' : '8px 32px',
    outline: 0,
    border: props.variant == 'outlined' ? '1px solid' + props.theme.palette.primary.main : 'none',
    backgroundColor: props.variant == 'outlined' ? 'transparent' : props.theme.palette.primary.main,
    transition: 'background-color 150ms ease-in-out',
    appearance: 'none',

    '&:hover': {
        backgroundColor:
            props.variant == 'outlined' ? '#ad82261f' : props.theme.palette.primary.dark
    }
}));

interface Props {
    children: React.ReactNode;
    variant?: ButtonVariant;
    size?: Size;
    onClick: () => void;
}

function Button(props: Props) {
    const theme = useTheme();

    return (
        <Container variant={props.variant} {...props}>
            <Typography
                variant="button"
                color={
                    props.variant == 'outlined'
                        ? theme.palette.primary.main
                        : theme.palette.common.white
                }
            >
                {props.children}
            </Typography>
        </Container>
    );
}

export default Button;

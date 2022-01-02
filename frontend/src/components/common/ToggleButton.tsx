import React from 'react';
import styled, { useTheme } from 'styled-components';
import Typography from './Typography';

type Size = 'small' | 'large';

const Container = styled.button<{ size?: Size; selected: boolean }>((props) => ({
    display: 'block',
    width: '100%',
    height: 'fit-content',
    ...(!props.selected && { cursor: 'pointer' }),
    userSelect: 'none',
    padding: props.size == 'small' ? '4px 24px' : '8px 32px',
    outline: 0,
    border: '1px solid ' + props.theme.palette.primary.main,
    backgroundColor: props.selected ? '#ad82261f' : 'transparent',
    transition: 'background-color ' + props.theme.transitionDuration + 'ms ease-in-out',
    appearance: 'none',

    ':not(:first-of-type)': {
        marginTop: '-1px'
    },

    '@media (hover: hover)': {
        ':hover': {
            ...(!props.selected && { backgroundColor: '#f1f1f1' })
        }
    },

    [`@media (min-width: ${props.theme.breakpoints.xs}px)`]: {
        ':not(:first-of-type)': {
            marginTop: 0,
            marginLeft: '-1px'
        }
    }
}));

interface ToggleButtonProps {
    children: React.ReactNode;
    selected: boolean;
    size?: Size;
    onClick: () => void;
}

export function ToggleButton(props: ToggleButtonProps) {
    const theme = useTheme();

    return (
        <Container selected={props.selected} onClick={props.onClick}>
            <Typography variant="button" color={theme.palette.primary.main} align="center">
                {props.children}
            </Typography>
        </Container>
    );
}

const ButtonGroup = styled.div((props) => ({
    display: 'grid',
    gridTemplateColumns: '100%',

    [`@media (min-width: ${props.theme.breakpoints.xs}px)`]: {
        gridTemplateColumns: '1fr 1fr',
        margin: 'auto'
    }
}));

interface ToggleButtonGroupProps {
    children: React.ReactNode;
}

export function ToggleButtonGroup(props: ToggleButtonGroupProps) {
    return <ButtonGroup>{props.children}</ButtonGroup>;
}

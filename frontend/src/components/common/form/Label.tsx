import styled from 'styled-components';

const Label = styled.label<{ color?: string }>((props) => ({
    display: 'block',
    marginBottom: '4px',
    color: props.color || props.theme.palette.text.light
}));

export default Label;

import styled from 'styled-components';

const TextInput = styled.input<{ backgroundColor?: string; color?: string }>((props) => ({
    display: 'block',
    width: '100%',
    padding: '12px',
    outline: 'none',
    border: 'none',
    appearance: 'none',
    color: props.color || props.theme.palette.text.dark,
    backgroundColor: props.backgroundColor || props.theme.palette.inputBackground.light,
    fontSize: '14px'
}));

export default TextInput;

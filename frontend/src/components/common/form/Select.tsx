import styled from 'styled-components';

const Select = styled.select<{ backgroundColor?: string; color?: string }>((props) => ({
    display: 'block',
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    outline: 'none',
    border: 'none',
    color: props.color || props.theme.palette.text.dark,
    backgroundColor: props.backgroundColor || props.theme.palette.inputBackground.light,
    cursor: 'pointer'
}));

export default Select;

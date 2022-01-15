import styled from 'styled-components';

const Input = styled.input((props) => ({
    display: 'block',
    width: '100%',
    backgroundColor: props.theme.palette.primary.main,
    color: props.theme.palette.common.white,
    border: '1px solid ' + props.theme.palette.primary.main,
    cursor: 'pointer',
    outline: 0,
    padding: '8px 32px',
    margin: '0 auto',
    transition:
        'background-color ' +
        props.theme.transitionDuration +
        'ms ease-in-out, ' +
        'border-color ' +
        props.theme.transitionDuration +
        'ms ease-in-out',
    appearance: 'none',
    fontFamily: 'PoppinsMedium',
    fontSize: '14px',

    '@media (hover: hover)': {
        ':hover': {
            backgroundColor: props.theme.palette.primary.dark,
            borderColor: props.theme.palette.primary.dark
        }
    }
}));

interface Props {
    value: string;
}

function SubmitButton(props: Props): JSX.Element {
    return <Input type="submit" value={props.value} />;
}

export default SubmitButton;

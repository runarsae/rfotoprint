import styled from 'styled-components';

const DURATION = 100;

const StyledButton = styled.input<{ dark?: boolean }>`
    display: block;
    width: 100%;
    font-size: 14px;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 1px;
    background-color: ${(props) => (props.dark ? '#39362c' : 'white')};
    color: ${(props) => props.theme.primary};
    border: 1px solid ${(props) => props.theme.primary};
    cursor: pointer;
    outline: 0;
    padding: 8px 24px;
    margin: 0 auto;
    border-radius: 2px;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    transition: background-color ${DURATION}ms ease-in-out;
    -webkit-appearance: none;

    &:hover {
        background-color: ${(props) => (props.dark ? '#4a473c' : '#ad82261f')};
    }
`;

interface Props {
    dark?: boolean;
    value: string;
}

function SubmitButton(props: Props): JSX.Element {
    return <StyledButton dark={props.dark} type="submit" value={props.value} />;
}

export default SubmitButton;

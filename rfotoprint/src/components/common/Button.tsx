import styled from 'styled-components';

const DURATION = 100;

const StyledButton = styled.button`
    display: block;
    font-size: 14px;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 1px;
    background-color: white;
    color: ${(props) => props.theme.primary};
    border: 1px solid ${(props) => props.theme.primary};
    cursor: pointer;
    outline: 0;
    padding: 8px 24px;
    margin: 0 auto;
    border-radius: 2px;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    transition: background-color ${DURATION}ms ease-in-out;

    &:hover {
        background-color: #ad82261f;
    }
`;

interface Props {
    children: string;
    onClick: () => void;
}

function Button(props: Props): JSX.Element {
    return <StyledButton onClick={() => props.onClick()}>{props.children}</StyledButton>;
}

export default Button;
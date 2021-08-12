import styled from 'styled-components';

const Button = styled.button`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 10px;
    align-items: center;
    text-align: left;
    width: 100%;
    max-width: 300px;
    font-size: 18px;
    //text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 1px;
    background-color: transparent;
    color: ${(props) => props.theme.text};
    border: none;
    cursor: pointer;
    outline: 0;
    padding: 8px 24px;
    margin: 0 auto;
    transition: background-color 100ms ease-in-out, color 100ms ease-in-out;

    &:hover {
        background-color: #ad82261f;
    }
`;

interface Props {
    text: string;
    icon: JSX.Element;
}

function MenuButton(props: Props) {
    return (
        <Button>
            {props.icon}
            {props.text}
        </Button>
    );
}

export default MenuButton;

import styled from 'styled-components';

const Button = styled.button`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 10px;
    align-items: center;
    text-align: left;
    width: 100%;
    max-width: 300px;
    font-size: 14px;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 1px;
    background-color: transparent;
    color: #737373;
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

const Icon = styled.img`
    display: inline-block;
    width: 20px;
    height: 20px;
`;

interface Props {
    text: string;
    icon: string;
}

function MenuButton(props: Props) {
    return (
        <Button>
            <Icon src={props.icon} />
            {props.text}
        </Button>
    );
}

export default MenuButton;

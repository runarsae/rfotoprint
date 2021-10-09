import styled from 'styled-components';
import { preloadImages, TRANSITION_DURATION } from '../../constants';

const Button = styled.button`
    display: block;
    position: absolute;
    top: 50px;
    right: 20px;
    pointer-events: auto;
    user-select: none;

    width: 20px;
    height: 20px;

    background-color: transparent;
    padding: 0;
    margin: 0;
    border: none;
    -webkit-appearance: none;

    opacity: 1;
    transition: opacity ${TRANSITION_DURATION}ms ease-in-out;

    :hover {
        cursor: pointer;
        opacity: 0.5;
    }

    @media (min-width: 520px) {
        right: 40px;
    }
`;

interface Props {
    onMouseDown: () => void;
}

export default function CloseButton(props: Props) {
    return (
        <Button onMouseDown={props.onMouseDown}>
            <img src={preloadImages.close} alt="Close" />
        </Button>
    );
}

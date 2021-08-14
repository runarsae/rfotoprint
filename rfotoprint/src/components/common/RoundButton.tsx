import styled from 'styled-components';

const DURATION = 100;

const RoundButton = styled.button`
    display: inline-block;
    width: 34px;
    height: 34px;
    background-color: white;
    border: 1px solid ${(props) => props.theme.primary};
    cursor: pointer;
    outline: 0;
    padding: 4px;
    border-radius: 50%;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    transition: background-color ${DURATION}ms ease-in-out;

    &:hover {
        background-color: #ad82261f;
    }
`;

export default RoundButton;

import styled from 'styled-components';

const DURATION = 100;

const RoundButton = styled.button`
    display: inline-block;
    width: 32px;
    height: 32px;
    background-color: #323536;
    border: none;
    cursor: pointer;
    outline: 0;
    padding: 4px;
    border-radius: 50%;
    transition: background-color ${DURATION}ms ease-in-out;

    &:hover {
        background-color: #636566;
    }
`;

export default RoundButton;

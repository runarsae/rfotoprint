import styled from 'styled-components';

const Title = styled.h1<{ align?: 'left' | 'center' | 'right' }>`
    text-align: ${(props) => (props.align ? props.align : 'left')};
    color: ${(props) => props.theme.title};
    font-weight: bold;
    font-size: 32px;
    transition: font-size 0.2s ease-in-out;

    @media (min-width: 1080px) {
        font-size: 40px;
    }
`;

export default Title;

import styled from 'styled-components';

const Wrapper = styled.div`
    position: relative;
    background-color: ${(props) => props.theme.background.main};
    width: 100%;
    height: 0;
    padding-top: 100%;
`;

const Content = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 20px;
`;

interface Props {
    children: JSX.Element;
}

function Card(props: Props) {
    return (
        <Wrapper>
            <Content>{props.children}</Content>
        </Wrapper>
    );
}

export default Card;

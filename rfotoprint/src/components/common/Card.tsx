import styled from 'styled-components';

const Wrapper = styled.div`
    position: relative;
    background-color: white;
    box-shadow: rgb(0 0 0 / 5%) 0px 6px 24px 0px, rgb(0 0 0 / 8%) 0px 0px 0px 1px;
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

    @media (min-width: 520px) {
        padding: 32px;
    }
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

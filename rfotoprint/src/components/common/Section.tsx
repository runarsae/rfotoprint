import styled from 'styled-components';

const Wrapper = styled.div<{ color?: 'dark' | 'main' | 'light' }>`
    background-color: ${(props) =>
        props.color ? props.theme.background[props.color] : props.theme.background.main};

    width: 100%;
`;

const Content = styled.div<{ dense?: Boolean }>`
    padding: 80px 20px;
    max-width: 1300px;
    margin: auto;

    @media (min-width: 520px) {
        padding: ${(props) => (props.dense ? '80px 40px' : '120px 40px')};
    }
`;

interface Props {
    children: JSX.Element;
    className?: string;
    color?: 'dark' | 'main' | 'light';
    dense?: Boolean;
    style?: React.CSSProperties;
}

function Section(props: Props) {
    return (
        <Wrapper className={props.className} color={props.color} style={props.style}>
            <Content dense={props.dense}>{props.children}</Content>
        </Wrapper>
    );
}

export default Section;

import styled from 'styled-components';
import { Element } from 'react-scroll';

const Wrapper = styled.div<{ color?: 'dark' | 'main' | 'light' }>`
    background-color: ${(props) =>
        props.color ? props.theme.background[props.color] : props.theme.background.main};

    width: 100%;
`;

const Content = styled.div<{ size?: 'large' | 'medium' | 'small' }>`
    padding: ${(props) => (props.size == 'small' ? '40px 20px' : '80px 20px')};
    max-width: 1300px;
    margin: auto;

    @media (min-width: 520px) {
        padding: ${(props) =>
            props.size == 'large'
                ? '120px 40px'
                : props.size == 'small'
                ? '40px 40px'
                : '80px 40px'};
    }
`;

interface Props {
    children: JSX.Element;
    className?: string;
    name?: string;
    color?: 'dark' | 'main' | 'light';
    size?: 'large' | 'medium' | 'small';
    style?: React.CSSProperties;
}

function Section(props: Props) {
    return (
        <Element name={props.name ? props.name : ''}>
            <Wrapper className={props.className} color={props.color} style={props.style}>
                <Content size={props.size}>{props.children}</Content>
            </Wrapper>
        </Element>
    );
}

export default Section;

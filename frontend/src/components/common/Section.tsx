import styled from 'styled-components';
import { Element } from 'react-scroll';

type Size = 'small' | 'normal' | 'large';
type Color = 'black' | 'white' | 'gray';

const Wrapper = styled.section<{ color?: Color }>((props) => ({
    backgroundColor: props.color
        ? props.theme.palette.common[props.color]
        : props.theme.palette.common.white,
    width: '100%'
}));

const Content = styled.div<{ size?: Size }>((props) => ({
    padding:
        props.size == 'small' ? '40px 20px' : props.size == 'large' ? '140px 20px' : '100px 20px',
    maxWidth: '1340px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',

    [`@media (min-width: ${props.theme.breakpoints.sm}px)`]: {
        padding:
            props.size == 'small'
                ? '40px 40px'
                : props.size == 'large'
                ? '140px 40px'
                : '100px 40px'
    }
}));

interface Props {
    children: React.ReactNode;
    name?: string;
    color?: Color;
    size?: Size;
}

function Section(props: Props) {
    return (
        <Element name={props.name ? props.name : ''}>
            <Wrapper color={props.color}>
                <Content size={props.size}>{props.children}</Content>
            </Wrapper>
        </Element>
    );
}

export default Section;

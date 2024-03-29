import styled, { DefaultTheme, StyledComponent } from 'styled-components';

const Heading1 = styled.h1({
    fontFamily: 'RalewayRegular',
    fontSize: 'max(min(8vw, 64px), 28px)',
    whiteSpace: 'nowrap'
});

const Heading2 = styled.h2((props) => ({
    fontFamily: 'RalewayRegular',
    fontSize: '26px',

    [`@media (min-width: ${props.theme.breakpoints.sm}px)`]: {
        fontSize: '38px'
    }
}));

const Heading3 = styled.h3((props) => ({
    fontFamily: 'RalewayRegular',
    fontSize: '16px',

    [`@media (min-width: ${props.theme.breakpoints.sm}px)`]: {
        fontSize: '21px'
    }
}));

const Heading4 = styled.h4({
    fontFamily: 'RalewayRegular',
    fontSize: '18px'
});

const Body1 = styled.p((props) => ({
    fontSize: '14px',

    [`@media (min-width: ${props.theme.breakpoints.sm}px)`]: {
        fontSize: '18px'
    }
}));

const Body2 = styled.p((props) => ({
    fontSize: '14px',

    [`@media (min-width: ${props.theme.breakpoints.sm}px)`]: {
        fontSize: '16px'
    }
}));

const Body3 = styled.p((props) => ({
    fontSize: '12px',

    [`@media (min-width: ${props.theme.breakpoints.sm}px)`]: {
        fontSize: '14px'
    }
}));

const Button = styled.p((props) => ({
    fontFamily: 'PoppinsMedium',
    fontSize: '14px',

    [`@media (min-width: ${props.theme.breakpoints.sm}px)`]: {
        fontSize: '16px'
    }
}));

const Signature = styled.p({
    fontFamily: 'SacramentoRegular',
    fontSize: '32px'
});

type Variants = 'h1' | 'h2' | 'h3' | 'h4' | 'body1' | 'body2' | 'body3' | 'button' | 'signature';

const variantsMapping: {
    [index: string]: StyledComponent<
        keyof JSX.IntrinsicElements | React.ComponentType<any>,
        DefaultTheme,
        {},
        never
    >;
} = {
    h1: Heading1,
    h2: Heading2,
    h3: Heading3,
    h4: Heading4,
    body1: Body1,
    body2: Body2,
    body3: Body3,
    button: Button,
    signature: Signature
};

type Align = 'left' | 'center' | 'right';

const Component = styled.span<{
    color?: string;
    fontSize?: string;
    align?: Align;
    marginBottom?: boolean;
    noWrap?: boolean;
    inline?: boolean;
}>((props) => ({
    color: props.color ? props.color : props.theme.palette.text.dark,
    textAlign: props.align ? props.align : 'left',
    ...(props.fontSize && {
        fontSize: props.fontSize
    }),
    ...(props.marginBottom && {
        marginBottom: '16px'
    }),
    ...(props.noWrap && {
        whiteSpace: 'nowrap'
    }),
    ...(props.inline && {
        display: 'inline'
    }),

    transition: 'color ' + props.theme.transitionDuration + 'ms ease-in-out'
}));

interface Props {
    children: React.ReactNode;
    variant?: Variants;
    color?: string;
    fontSize?: string;
    align?: Align;
    marginBottom?: boolean;
    noWrap?: boolean;
    inline?: boolean;
}

function Typography(props: Props) {
    return (
        <Component
            as={props.variant ? variantsMapping[props.variant] : Body1}
            color={props.color}
            fontSize={props.fontSize}
            align={props.align}
            marginBottom={props.marginBottom}
            noWrap={props.noWrap}
            inline={props.inline}
        >
            {props.children}
        </Component>
    );
}

export default Typography;

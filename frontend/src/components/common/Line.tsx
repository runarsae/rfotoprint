import styled from 'styled-components';

type Color = 'dark' | 'light';

const Line = styled.hr<{ color?: Color }>((props) => ({
    width: '100%',
    borderRight: 'none',
    borderLeft: 'none',
    borderBottom: 'none',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor:
        props.color == 'dark'
            ? props.theme.palette.horizontalLine.dark
            : props.theme.palette.horizontalLine.light,
    boxShadow: 'none'
}));

export default Line;

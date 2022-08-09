import styled from 'styled-components';

const TableWrapper = styled.div({
    width: '100%',
    overflowX: 'auto'
});

const Table = styled.table<{ dark?: boolean }>((props) => ({
    width: '100%',
    textAlign: 'center',
    borderCollapse: 'collapse',
    whiteSpace: 'nowrap',

    th: {
        padding: '8px',
        borderBottom: `1px solid ${
            props.dark
                ? props.theme.palette.horizontalLine.dark
                : props.theme.palette.horizontalLine.light
        }`,
        color: props.dark ? props.theme.palette.common.white : props.theme.palette.common.black
    },

    td: {
        padding: '8px',
        color: props.dark ? props.theme.palette.text.light : props.theme.palette.text.dark
    },

    'tr:nth-child(even)': {
        backgroundColor: props.dark ? '#1b1b1b' : 'none'
    }
}));

const Th = styled.th<{
    align?: 'left' | 'center' | 'right';
    fitContent?: boolean;
}>((props) => ({
    fontWeight: 'normal',
    textAlign: props.align ? props.align : 'center',
    width: props.fitContent ? '1%' : 'auto'
}));

const Td = styled.td<{
    align?: 'left' | 'center' | 'right';
    fitContent?: boolean;
    color?: string;
}>((props) => ({
    textAlign: props.align ? props.align : 'center',
    width: props.fitContent ? '1%' : 'auto',
    ...(props.color && { color: props.color + ' !important' })
}));

export { TableWrapper, Table, Th, Td };

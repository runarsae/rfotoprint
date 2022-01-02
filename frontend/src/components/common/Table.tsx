import styled from 'styled-components';

const TableWrapper = styled.div({
    width: '100%',
    overflowX: 'auto'
});

const Table = styled.table((props) => ({
    width: '100%',
    textAlign: 'center',
    borderCollapse: 'collapse',
    whiteSpace: 'nowrap',

    'th, td': {
        padding: '8px'
    },

    'tr:nth-child(even)': {
        backgroundColor: '#1b1b1b'
    }
}));

const Th = styled.th<{
    align?: 'left' | 'center' | 'right';
    fitContent?: boolean;
}>((props) => ({
    fontWeight: 'normal',
    color: props.theme.palette.common.white,
    borderBottom: '1px solid' + props.theme.palette.horizontalLine.dark,
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
    color: props.color ? props.color : props.theme.palette.text.light
}));

export { TableWrapper, Table, Th, Td };

import styled from 'styled-components';

const TableWrapper = styled.div`
    width: 100%;
    overflow-x: auto;
    margin: 40px 0;
`;

const Table = styled.table`
    width: 100%;
    color: #9e9e9e;
    text-align: center;
    border-collapse: collapse;
    font-size: 16px;
    white-space: nowrap;

    th,
    td {
        padding: 5px;
    }

    th {
        font-weight: normal;
    }

    tr:nth-child(even) {
        background-color: ${(props) => props.theme.background.dark};
    }
`;

const Th = styled.th<{
    align?: 'left' | 'center' | 'right';
    fitContent?: boolean;
}>`
    color: white;
    border-bottom: 1px solid gray;
    text-align: ${(props) => (props.align ? props.align : 'center')};
    width: ${(props) => (props.fitContent ? '1%' : 'auto')};
`;

const Td = styled.td<{
    align?: 'left' | 'center' | 'right';
    fitContent?: boolean;
    color?: string;
}>`
    ${(props) => props.color && 'color: ' + props.color + ';'}
    text-align: ${(props) => (props.align ? props.align : 'centers')};
    width: ${(props) => (props.fitContent ? '1%' : 'auto')};
`;

export { TableWrapper, Table, Th, Td };

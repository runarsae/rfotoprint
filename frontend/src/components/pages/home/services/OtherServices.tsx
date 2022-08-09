import { Fade } from 'react-awesome-reveal';
import styled, { useTheme } from 'styled-components';
import Typography from '../../../common/Typography';

const Container = styled.div({
    position: 'relative',
    width: '100%',
    maxWidth: '760px',
    margin: 'auto'
});

const Table = styled.table({
    tableLayout: 'fixed',
    width: '100%',
    borderSpacing: '0px 8px'
});

const Tr = styled.tr((props) => ({
    backgroundColor: props.theme.palette.common.white
}));

const Td = styled.td({
    padding: '16px',

    ':first-child': {
        width: '60%'
    },

    ':last-child': {
        width: '40%'
    }
});

function OtherServices() {
    const theme = useTheme();
    return (
        <Container>
            <Fade triggerOnce cascade damping={0.1}>
                <Table>
                    <tbody>
                        <Tr>
                            <Td>
                                <Typography variant="body2" color={theme.palette.text.dark}>
                                    Utleie diaskop/dias&shy;betrakter
                                </Typography>
                            </Td>
                            <Td>
                                <Typography
                                    variant="button"
                                    color={theme.palette.primary.main}
                                    align="right"
                                >
                                    Kr 150,- pr. dag
                                </Typography>
                            </Td>
                        </Tr>
                    </tbody>
                </Table>
            </Fade>
        </Container>
    );
}

export default OtherServices;

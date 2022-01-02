import Section from '../../common/Section';
import Typography from '../../common/Typography';

function NotFound() {
    return (
        <Section>
            <Typography variant="h1" align="center">
                404
            </Typography>
            <Typography variant="body1" align="center">
                Beklager, den forespurte siden ble ikke funnet.
            </Typography>
        </Section>
    );
}

export default NotFound;

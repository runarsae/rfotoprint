import styled from 'styled-components';
import Section from '../../common/Section';
import Typography from '../../common/Typography';
import logo from '../../../logo/logo-2-dark.svg';

const Logo = styled.img({
    display: 'block',
    margin: 'auto',
    width: '200px'
});

function NotFound() {
    return (
        <Section>
            <Logo src={logo} alt="Rossland Fotoprint" />
            <div>
                <Typography variant="h1" align="center" fontSize="32px" marginBottom>
                    404
                </Typography>
                <Typography variant="body1" align="center">
                    Beklager, den forespurte siden ble ikke funnet.
                </Typography>
            </div>
        </Section>
    );
}

export default NotFound;

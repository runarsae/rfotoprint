import { useAuth } from '../../../util/auth';
import Section from '../../common/Section';
import Typography from '../../common/Typography';

function Panel() {
    const auth = useAuth();

    return (
        <Section>
            {auth && (
                <div>
                    <Typography>Panel</Typography>
                </div>
            )}
        </Section>
    );
}

export default Panel;

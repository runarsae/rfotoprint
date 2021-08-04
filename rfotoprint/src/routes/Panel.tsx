import Section from '../components/common/Section';
import { requireAuth } from '../utils/requireAuth';

function Panel() {
    requireAuth();

    return (
        <Section color="light">
            <div>Panel</div>
        </Section>
    );
}

export default Panel;

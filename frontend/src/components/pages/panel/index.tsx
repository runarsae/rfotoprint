import { Suspense } from 'react';
import { useAuth } from '../../../util/auth';
import Section from '../../common/Section';
import Typography from '../../common/Typography';
import Filter from './Filter';
import ProductList from './ProductList';

function Panel() {
    const auth = useAuth();

    return (
        <Section>
            {auth && (
                <>
                    <Filter />

                    <Suspense
                        fallback={
                            <Typography variant="body1" align="center">
                                Laster..
                            </Typography>
                        }
                    >
                        <ProductList />
                    </Suspense>
                </>
            )}
        </Section>
    );
}

export default Panel;

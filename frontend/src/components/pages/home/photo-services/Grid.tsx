import { Fade } from 'react-awesome-reveal';
import styled from 'styled-components';
import GridItem from './GridItem';
import getPhotoServices from './PhotoServices';

const Container = styled.div((props) => ({
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '1fr',
    width: '100%',
    gap: '32px',
    justifyItems: 'center',

    [`@media (min-width: ${props.theme.breakpoints.sm}px)`]: {
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))'
    },

    [`@media (min-width: ${props.theme.breakpoints.lg}px)`]: {
        gap: '64px'
    }
}));

function Grid() {
    const photoServices = getPhotoServices();

    return (
        <>
            <Container>
                <Fade triggerOnce cascade damping={0.1}>
                    {photoServices.map((item, index) => (
                        <GridItem
                            key={index}
                            title={item.title}
                            image={item.image}
                            description={item.description}
                            price={item.price}
                            priceOnClick={item.priceOnClick}
                        />
                    ))}
                </Fade>
            </Container>
        </>
    );
}

export default Grid;

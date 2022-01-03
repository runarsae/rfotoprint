import styled from 'styled-components';
import GridItem from './GridItem';
import getPhotoServices from './PhotoServices';

const Container = styled.div((props) => ({
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '1fr',
    width: '100%',
    gap: '24px',

    [`@media (min-width: ${props.theme.breakpoints.sm}px)`]: {
        gridTemplateColumns: '1fr 1fr'
    },

    [`@media (min-width: ${props.theme.breakpoints.lg}px)`]: {
        gridTemplateColumns: '1fr 1fr 1fr'
    },

    [`@media (min-width: ${props.theme.breakpoints.xl}px)`]: {
        gap: '64px'
    }
}));

function Grid() {
    const photoServices = getPhotoServices();

    return (
        <>
            <Container>
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
            </Container>
        </>
    );
}

export default Grid;

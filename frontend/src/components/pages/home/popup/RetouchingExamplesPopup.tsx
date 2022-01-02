import styled, { useTheme } from 'styled-components';
import Typography from '../../../common/Typography';
import before1 from '../photo-services/img/retouching-examples/before-1.jpg';
import after1 from '../photo-services/img/retouching-examples/after-1.jpg';

const Wrapper = styled.div((props) => ({
    display: 'flex',
    width: '100%',
    height: '100%',
    maxWidth: '1080px',
    flexDirection: 'column',
    userSelect: 'none',
    gap: '20px',

    [`@media (min-width: ${props.theme.breakpoints.sm}px)`]: {
        gap: '40px'
    }
}));

const Images = styled.div((props) => ({
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',

    [`@media (min-width: ${props.theme.breakpoints.sm}px)`]: {
        gap: '40px'
    },

    [`@media (min-width: ${props.theme.breakpoints.lg}px)`]: {
        flexDirection: 'row'
    }
}));

const ImageContainer = styled.div({
    position: 'relative',
    overflow: 'hidden',

    img: {
        display: 'block',
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        boxShadow: '0px 20px 50px 0px rgb(0 0 0 / 6%)'
    }
});

const Label = styled.div((props) => ({
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: props.theme.palette.common.black,
    padding: '8px 16px',
    overflow: 'hidden'
}));

const retouchingExamples: { before: string; after: string }[] = [
    {
        before: before1,
        after: after1
    }
];

function RetouchingExamplesPopup() {
    const theme = useTheme();

    return (
        <Wrapper
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            {retouchingExamples.map((example, i) => (
                <Images key={i}>
                    <ImageContainer>
                        <img src={example.before} alt="Before retouching" />
                        <Label>
                            <Typography color={theme.palette.common.white}>FØR</Typography>
                        </Label>
                    </ImageContainer>
                    <ImageContainer>
                        <img src={example.after} alt="After retouching" />
                        <Label>
                            <Typography color={theme.palette.common.white}>ETTER</Typography>
                        </Label>
                    </ImageContainer>
                </Images>
            ))}
        </Wrapper>
    );
}

export default RetouchingExamplesPopup;

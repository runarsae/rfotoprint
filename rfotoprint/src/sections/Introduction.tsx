import styled from 'styled-components';
import Title from '../components/common/Title';
import Text from '../components/common/Text';
import Section from '../components/common/Section';

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    gap: 20px;

    @media (min-width: 768px) {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 339px;
        gap: 120px;
    }
`;

const LandingText = styled(Text)`
    line-height: 1.5;
`;

const ImageContainer = styled.div`
    position: relative;
    justify-self: center;
    width: 100%;
    padding-top: calc(339 / 550 * 100%);

    @media (min-width: 768px) {
        justify-self: right;
    }
`;

const LandingImage = styled.img`
    width: 100%;
    height: 100%;
    max-width: 435px;
    justify-self: center;
`;

const LandingImageFront = styled.img`
    position: absolute;
    width: 60%;
    height: 50%;
    bottom: 0;
    left: 0;
    z-index: 1;
`;

const LandingImageBack = styled.img`
    position: absolute;
    width: 75%;
    top: 0;
    right: 0;
`;

export default function Introduction() {
    return (
        <Section color="light">
            <Wrapper>
                <>
                    <div>
                        <Title>Bilder, passfoto & kontorrekvisita</Title>
                        <LandingText>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                            pellentesque imperdiet purus, iaculis gravida ex. Duis eu dolor ut lacus
                            interdum tempus vel et mi.
                            <br />
                            <br />
                            Velkommen!
                            <br />
                            <i>Hilsen Ann Elin</i>
                        </LandingText>
                    </div>

                    <LandingImage src="/img/landing2.svg" alt="Rossland Fotoprint" />
                    {/* <ImageContainer>
                        <LandingImageBack src="/img/camera.jpg" />
                        <LandingImageFront src="/img/photos2.jpg" />
                    </ImageContainer> */}
                </>
            </Wrapper>
        </Section>
    );
}

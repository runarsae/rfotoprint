import styled from 'styled-components';
import Title from '../components/common/Title';
import Text from '../components/common/Text';

const Wrapper = styled.div`
    padding: 40px 20px;
    width: 100%;
    max-width: 1300px;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    gap: 20px;

    @media (min-width: 520px) {
        padding: max(4%, 100px) 40px;
    }

    @media (min-width: 768px) {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 339px;
        gap: 40px;
    }
`;

const LandingText = styled.div``;

const LandingImage = styled.img`
    position: relative;
    justify-self: center;
    width: 100%;
    max-height: 339px;
    height: 339px;

    @media (min-width: 768px) {
        justify-self: right;
        max-width: 500px;
        max-height: 339px;
        width: 100%;
        height: 100%;
        min-width: 350px;
    }
`;

export default function Introduction() {
    return (
        <>
            <Wrapper>
                <LandingText>
                    <Title>Bilder, passfoto & kontorrekvisita</Title>
                    <Text>
                        Rossland Fotoprint ble etablert 24. januar 2020. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Morbi pellentesque imperdiet purus, iaculis
                        gravida ex. Duis eu dolor ut lacus interdum tempus vel et mi. In hac
                        habitasse platea dictumst.
                        <br />
                        <br />
                        Velkommen!
                        <br />
                        <i>Hilsen Ann Elin</i>
                    </Text>
                </LandingText>
                <LandingImage src="/img/landing.svg" />
            </Wrapper>
        </>
    );
}

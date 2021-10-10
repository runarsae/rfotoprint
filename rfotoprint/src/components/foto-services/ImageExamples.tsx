import styled from 'styled-components';
import { preloadImages } from '../../constants';
import Text from '../common/Text';

const ImageDisplay = styled.div`
    display: grid;
    width: 100%;
    min-height: 100%;
    max-height: 100%;
    max-width: 1080px;
    grid-template-columns: auto;
    align-items: center;
    user-select: none;
    gap: 20px;

    @media (min-width: 520px) {
        gap: 40px;
    }

    @media (min-width: 640px) {
        grid-template-columns: auto auto;
    }
`;

const ImageContainer = styled.div`
    position: relative;
    border-radius: 2px;
    overflow: hidden;

    & img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
        box-shadow: rgb(0 0 0 / 5%) 0px 6px 24px 0px, rgb(0 0 0 / 8%) 0px 0px 0px 1px;
    }
`;

const Label = styled(Text)`
    position: absolute;
    bottom: 0;
    right: 0;
    color: white;
    background-color: ${(props) => props.theme.background.dark};
    padding: 12px;
    font-weight: bold;
    border-top-left-radius: 2px;
    overflow: hidden;
`;

export default function ImageExamples() {
    return (
        <ImageDisplay
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <ImageContainer>
                <img src={preloadImages.before} alt="Before edit" />
                <Label>FØR</Label>
            </ImageContainer>
            <ImageContainer>
                <img src={preloadImages.after} alt="After edit" />
                <Label>ETTER</Label>
            </ImageContainer>
        </ImageDisplay>
    );
}

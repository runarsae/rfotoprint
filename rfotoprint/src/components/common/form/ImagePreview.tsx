import styled from 'styled-components';

export const ImageWrapper = styled.div`
    width: 100%;
    height: auto;
    border-radius: 2px;
    background-color: #404040;
    padding: 14px;
    cursor: pointer;
`;

export const ImageDisplay = styled.img`
    display: block;
    width: 100%;
    height: 260px;
    object-fit: contain;
`;

export const ImagePlaceholder = styled.div`
    display: block;
    font-weight: normal;
    color: #a7a7a7;
    letter-spacing: 0;
    text-align: center;
`;

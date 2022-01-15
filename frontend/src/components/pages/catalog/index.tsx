import styled from 'styled-components';

const IFrame = styled.iframe`
    display: block;
    width: 100%;
    height: 100%;
    border: none;
`;

function Catalog() {
    return (
        <IFrame
            src="https://ekstranett.emo.no/kataloger/katalog1/"
            title="Kontorkatalogen"
            referrerPolicy="no-referrer"
        />
    );
}

export default Catalog;

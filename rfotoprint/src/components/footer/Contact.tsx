import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: block;
    grid-area: contact;

    @media (min-width: 640px) {
        justify-self: right;
    }

    @media (min-width: 1080px) {
        justify-self: left;
    }
`;

const Title = styled.h3`
    font-weight: normal;
    text-align: center;

    @media (min-width: 640px) {
        text-align: left;
    }
`;

const Paragraph = styled.p`
    color: #9c9c9c;
    margin: 0 0 5px 0;
    text-align: center;

    @media (min-width: 640px) {
        text-align: left;
    }
`;

const ContactInformation = styled.div`
    display: grid;
    grid-template-columns: auto;
    gap: 10px;
    margin-top: 20px;
    text-align: center;

    @media (min-width: 640px) {
        grid-template-columns: 32px auto;
        grid-gap: 15px 10px;
        text-align: left;
    }
`;

const Link = styled.a`
    color: #9c9c9c;
    text-decoration: none;
    transition: color 0.15s;
    margin-top: 5px;
    display: inline-block;
    font-style: italic;

    &:hover {
        color: ${(props) => props.theme.primary};
    }
`;

const Icon = styled.img`
    padding: 8px;
    width: 32px;
    background-color: ${(props) => props.theme.background.darker};
    border-radius: 50%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
`;

function Contact(): JSX.Element {
    return (
        <Wrapper>
            <Title>R Fotoprint</Title>
            <Paragraph>Ta kontakt for avtale og kjøp.</Paragraph>
            <ContactInformation>
                <Icon src="/img/icons/phone.png" alt="Phone" />
                <span>
                    Telefon
                    <Paragraph>
                        <Link href="tel:+4790284152">+47 902 84 152</Link>
                    </Paragraph>
                </span>
                <Icon src="/img/icons/mail.png" alt="Email" />
                <span>
                    E-post
                    <Paragraph>
                        <Link href="mailto:r-fotoprint@online.no">r-fotoprint@online.no</Link>
                    </Paragraph>
                </span>
                <Icon src="/img/icons/marker.png" alt="Address" />
                <span>
                    Adresse
                    <Paragraph>
                        <Link
                            href="https://www.google.no/maps/place/J%C3%B8ntelhaugen+12,+6612+Gr%C3%B8a/@62.6499756,8.7146771,12.67z/data=!4m5!3m4!1s0x46137bff984baddf:0x85f1fbe012a32e60!8m2!3d62.6511788!4d8.7168964"
                            target="_blank"
                        >
                            Jøntelhaugen 12, 6612 Grøa
                        </Link>
                    </Paragraph>
                </span>
            </ContactInformation>
        </Wrapper>
    );
}

export default Contact;

import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    grid-area: external;
    justify-self: center;
    text-align: center;

    @media (min-width: 640px) {
        justify-self: left;
        text-align: left;
    }

    @media (min-width: 1080px) {
        justify-self: right;
    }
`;

const FacebookWrapper = styled.div`
    display: block;
    width: 280px;
    height: 130px;

    @media (min-width: 1080px) {
        width: 250px;
    }
`;

const Embed = styled.iframe`
    display: block;
    border-radius: 2px;
    border: none;
`;

const Title = styled.h3`
    font-weight: normal;
    text-align: center;
    margin-bottom: 10px;

    &:not(:first-child) {
        margin-top: calc(1em + 60px);
    }

    @media (min-width: 640px) {
        text-align: left;

        &:not(:first-child) {
            margin-top: 30px;
        }
    }
`;

const MediaLogo = styled.img`
    display: inline-block;
    width: 26px;
    height: 26px;
    margin-right: 8px;
    border-radius: 2px;
`;

const Link = styled.a`
    color: #9c9c9c;
    text-decoration: none;
    transition: color 0.15s;
    margin-top: 5px;
    font-style: italic;
    display: inline-flex;
    align-items: center;

    &:hover {
        color: ${(props) => props.theme.primary};
    }
`;

function External(): JSX.Element {
    const [screenWidth, setScreenWidth] = useState(1080);

    useEffect(() => {
        setScreenWidth(window.innerWidth);
        window.addEventListener('resize', resize);
    }, []);

    const resize = () => {
        setScreenWidth(window.innerWidth);
    };

    return (
        <Wrapper>
            <Title>Facebook</Title>
            <FacebookWrapper>
                {screenWidth < 1080 ? (
                    <Embed
                        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FR-Fotoprint-112650973637204&tabs&width=280&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId"
                        width="280"
                        height="130"
                        scrolling="no"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    ></Embed>
                ) : (
                    <Embed
                        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FR-Fotoprint-112650973637204&tabs&width=250&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId"
                        width="250"
                        height="130"
                        scrolling="no"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    ></Embed>
                )}
            </FacebookWrapper>
            <Title>Media</Title>
            <Link
                href="https://www.auraavis.no/ann-elin-skapte-sin-egen-arbeidsplass/s/5-5-276059"
                target="_blank"
            >
                <MediaLogo src="/img/auraavis.png" alt="Aura Avis" />
                Les artikkel i Aura Avis (+) &#187;
            </Link>
        </Wrapper>
    );
}

export default External;

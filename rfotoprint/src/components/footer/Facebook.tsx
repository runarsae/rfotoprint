import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: block;
    justify-self: center;
    width: 280px;
    height: 130px;
    grid-area: facebook;

    @media (min-width: 640px) {
        justify-self: left;
        align-self: center;
    }

    @media (min-width: 1080px) {
        width: 320px;
        justify-self: right;
    }
`;

const Embed = styled.iframe`
    display: block;
    border-radius: 2px;
    border: none;
`;

function Facebook(): JSX.Element {
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
                    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FR-Fotoprint-112650973637204&tabs&width=320&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId"
                    width="320"
                    height="130"
                    scrolling="no"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                ></Embed>
            )}
        </Wrapper>
    );
}

export default Facebook;

import { useEffect } from 'react';
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
    width: 250px;
    height: 130px;
    border-radius: 2px;
    overflow: hidden;
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
    useEffect(() => {
        const script = document.createElement('script');
        script.src =
            'https://connect.facebook.net/nb_NO/sdk.js#xfbml=1&version=v11.0&appId=3862451110533375&autoLogAppEvents=1';
        script.async = true;
        script.defer = true;
        script.crossOrigin = 'anonymous';
        script.nonce = 'gpbFNnSm';
        document.head.appendChild(script);
    }, []);

    return (
        <Wrapper>
            <Title>Facebook</Title>
            <FacebookWrapper>
                <div id="fb-root"></div>
                <div
                    className="fb-page"
                    data-href="https://www.facebook.com/profile.php?id=100063615033077"
                    data-tabs=""
                    data-width="250"
                    data-height="130"
                    data-small-header="false"
                    data-adapt-container-width="true"
                    data-hide-cover="false"
                    data-show-facepile="false"
                >
                    <blockquote
                        cite="https://www.facebook.com/profile.php?id=100063615033077"
                        className="fb-xfbml-parse-ignore"
                    >
                        <a href="https://www.facebook.com/profile.php?id=100063615033077">
                            R Fotoprint
                        </a>
                    </blockquote>
                </div>
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

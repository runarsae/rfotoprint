import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: auto;
    grid-gap: 20px;
    grid-area: profile;
    align-self: center;
`;

const ProfileImg = styled.img`
    display: block;
    margin: auto;
    width: 100px;
    border-radius: 50%;
`;

const ProfileName = styled.h3`
    display: block;
    text-align: center;
    margin: 0 0 5px 0;
    font-weight: normal;
`;

const ProfileTitle = styled.p`
    display: block;
    text-align: center;
    margin: 0;
    color: #999999;
`;

function Profile(): JSX.Element {
    return (
        <Wrapper>
            <ProfileImg src="/img/profile.jpg" alt="Profile picture" />

            <div>
                <ProfileName>Ann Elin Rossland</ProfileName>
                <ProfileTitle>Selvstendig næringsdrivende</ProfileTitle>
            </div>
        </Wrapper>
    );
}

export default Profile;

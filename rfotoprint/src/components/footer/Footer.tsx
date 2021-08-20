import styled from 'styled-components';
import Section from '../common/Section';
import Contact from './Contact';
import RightContent from './RightContent';
import Profile from './Profile';

const FooterContent = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas:
        'contact'
        'profile'
        'right';
    gap: 60px;
    color: #ffffff;

    @media (min-width: 640px) {
        grid-template-columns: repeat(2, 1fr);
        grid-template-areas:
            'contact right'
            'profile profile';
        gap: 40px 40px;
    }

    @media (min-width: 768px) {
        gap: 40px 100px;
    }

    @media (min-width: 1080px) {
        grid-template-columns: repeat(3, 1fr);
        grid-template-areas: 'contact profile right';
        gap: 20px;
    }
`;

const CopyrightBar = styled.div`
    width: 100%;
    padding: 10px 30px;
    background: ${(props) => props.theme.background.darker};
    color: #999999;
    text-align: center;
    font-size: 14px;

    @media (min-width: 520px) {
        padding: 10px 40px;
    }
`;

function Footer(): JSX.Element {
    return (
        <>
            <Section name="Kontakt" color="dark">
                <FooterContent>
                    <Contact />
                    <Profile />
                    <RightContent />
                </FooterContent>
            </Section>
            <CopyrightBar>Copyright &copy; {new Date().getFullYear()}, R Fotoprint</CopyrightBar>
        </>
    );
}

export default Footer;

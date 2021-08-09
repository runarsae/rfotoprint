import styled from 'styled-components';
import Section from '../components/common/Section';
import AddProduct from '../components/panel/AddProduct';
import MenuButton from '../components/panel/MenuButton';
import { requireAuth, verifyAuth } from '../utils/auth';

const Grid = styled.div`
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 40px;
`;

const Menu = styled.div`
    padding: 40px 0 40px 40px;
    height: 100%;
`;

const Logo = styled.img`
    display: block;
    height: 65px;
    margin: 0 0 40px 24px;
`;

const Line = styled.div`
    height: 100%;
    width: 1px;
    background-color: #e2e2e2;
`;

const Content = styled.div`
    padding: 40px;
`;

function Panel() {
    const verified = verifyAuth();

    console.log(verified);

    return (
        <Section color="light">
            <Grid>
                <Menu>
                    <Logo src="/img/logo_dark.png" alt="Rossland Fotoprint" />
                    <MenuButton text="Lagervarer" icon="/img/icons/panel/box.png"></MenuButton>
                    <MenuButton text="Priser" icon="/img/icons/panel/price.png"></MenuButton>
                    <MenuButton text="Logg ut" icon="/img/icons/panel/sign-out.png"></MenuButton>
                </Menu>
                <Content>
                    <AddProduct />
                </Content>
            </Grid>
        </Section>
    );
}

export default Panel;

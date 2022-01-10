import { Suspense } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { sidebarOpenState, SidebarType, sidebarTypeState } from '../../../state/panel/sidebar';
import { useAuth } from '../../../util/auth';
import Button from '../../common/Button';
import Section from '../../common/Section';
import Sidebar from '../../common/Sidebar';
import Typography from '../../common/Typography';
import Filter from './Filter';
import ProductList from './ProductList';
import AddProduct from './sidebar/AddProduct';

const Menu = styled.div({
    display: 'grid',
    width: '100%',
    gridTemplateColumns: '1fr auto',
    gap: '32px',
    alignItems: 'center',
    justifyItems: 'flex-end'
});

function Panel() {
    const auth = useAuth();

    const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarOpenState);
    const sidebarType = useRecoilValue(sidebarTypeState);

    const setSidebarType = useSetRecoilState(sidebarTypeState);

    return (
        <>
            <Section>
                {auth && (
                    <>
                        <Menu>
                            <div>
                                <Filter />
                            </div>

                            <Button
                                onClick={() => {
                                    setSidebarType(SidebarType.AddProduct);
                                    setSidebarOpen(true);
                                }}
                            >
                                Ny vare
                            </Button>
                        </Menu>

                        <Suspense
                            fallback={
                                <Typography variant="body1" align="center">
                                    Laster..
                                </Typography>
                            }
                        >
                            <ProductList />
                        </Suspense>
                    </>
                )}
            </Section>

            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}>
                {sidebarType == SidebarType.AddProduct ? (
                    <AddProduct />
                ) : sidebarType == SidebarType.EditProduct ? (
                    // <EditProduct />
                    <></>
                ) : (
                    <></>
                )}
            </Sidebar>
        </>
    );
}

export default Panel;

import { Suspense } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { popupOpenState, PopupType, popupTypeState } from '../../../state/panel/popup';
import { popupProductImageState } from '../../../state/panel/products';
import { sidebarOpenState, SidebarType, sidebarTypeState } from '../../../state/panel/sidebar';
import { useAuth } from '../../../util/auth';
import Button from '../../common/Button';
import Popup from '../../common/Popup';
import ProductImagePopup from '../../common/ProductImagePopup';
import Section from '../../common/Section';
import Sidebar from '../../common/Sidebar';
import Typography from '../../common/Typography';
import Filter from './Filter';
import ProductList from './ProductList';
import AddProduct from './sidebar/AddProduct';
import EditProduct from './sidebar/EditProduct';

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

    const [popupOpen, setPopupOpen] = useRecoilState(popupOpenState);
    const popupType = useRecoilValue(popupTypeState);

    const popupProductImage = useRecoilValue(popupProductImageState);

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
                    <EditProduct />
                ) : (
                    <></>
                )}
            </Sidebar>

            <Popup open={popupOpen} setOpen={setPopupOpen}>
                {popupType == PopupType.ProductImage ? (
                    <ProductImagePopup image={popupProductImage} />
                ) : (
                    <></>
                )}
            </Popup>
        </>
    );
}

export default Panel;

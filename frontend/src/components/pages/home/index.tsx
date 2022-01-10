import Footer from './footer';
import Header from './header';
import Introduction from './introduction';
import Sidebar from '../../common/Sidebar';
import PhotoServices from './photo-services';
import Popup from '../../common/Popup';
import Products from './products';
import StockProducts from './stock-products';
import { useRecoilState, useRecoilValue } from 'recoil';
import { sidebarOpenState, SidebarType, sidebarTypeState } from '../../../state/home/sidebar';
import PriceList from './sidebar/PriceList';
import Navigation from './sidebar/Navigation';
import { popupOpenState, PopupType, popupTypeState } from '../../../state/home/popup';
import ProductImagePopup from './popup/ProductImagePopup';
import RetouchingExamplesPopup from './popup/RetouchingExamplesPopup';

function Home() {
    const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarOpenState);
    const sidebarType = useRecoilValue(sidebarTypeState);

    const [popupOpen, setPopupOpen] = useRecoilState(popupOpenState);
    const popupType = useRecoilValue(popupTypeState);

    return (
        <>
            <Header />
            <Introduction />
            <PhotoServices />
            <Products />
            <StockProducts />
            <Footer />

            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}>
                {sidebarType == SidebarType.Navigation ? (
                    <Navigation />
                ) : sidebarType == SidebarType.PriceList ? (
                    <PriceList />
                ) : (
                    <></>
                )}
            </Sidebar>

            <Popup open={popupOpen} setOpen={setPopupOpen}>
                {popupType == PopupType.ProductImage ? (
                    <ProductImagePopup />
                ) : popupType == PopupType.RetouchingExamples ? (
                    <RetouchingExamplesPopup />
                ) : (
                    <></>
                )}
            </Popup>
        </>
    );
}

export default Home;

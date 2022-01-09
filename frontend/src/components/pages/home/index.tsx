import Footer from './footer';
import Header from './header';
import Introduction from './introduction';
import Sidebar from '../../common/Sidebar';
import PhotoServices from './photo-services';
import Popup from './popup';
import Products from './products';
import StockProducts from './stock-products';
import { useRecoilState, useRecoilValue } from 'recoil';
import { sidebarOpenState, SidebarType, sidebarTypeState } from '../../../state/sidebar';
import PriceList from './sidebar/PriceList';
import Navigation from './sidebar/Navigation';

function Home() {
    const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarOpenState);
    const sidebarType = useRecoilValue(sidebarTypeState);

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
            <Popup />
        </>
    );
}

export default Home;

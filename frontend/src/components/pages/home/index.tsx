import Footer from './footer';
import Header from './header';
import Introduction from './introduction';
import Panel from './panel';
import PhotoServices from './photo-services';
import Popup from './popup';
import Products from './products';
import StockProducts from './stock-products';

function Home() {
    return (
        <>
            <Header />
            <Introduction />
            <PhotoServices />
            <Products />
            <StockProducts />
            <Footer />

            <Panel />
            <Popup />
        </>
    );
}

export default Home;

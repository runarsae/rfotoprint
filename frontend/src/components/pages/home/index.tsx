import Footer from './footer';
import Header from './header';
import Introduction from './introduction';
import Panel from './panel';
import PhotoServices from './photo-services';
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

            {/* Replace with auth check */}
            {true && <Panel />}
        </>
    );
}

export default Home;

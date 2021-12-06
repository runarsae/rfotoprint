import Footer from './footer';
import Header from './header';
import Introduction from './introduction';
import Panel from './panel';
import PhotoServices from './photo-services';
import Products from './products';
import StockItems from './stock-items';

function Home() {
    return (
        <>
            <Header />
            <Introduction />
            <PhotoServices />
            <Products />
            <StockItems />
            <Footer />

            {/* Replace with auth check */}
            {true && <Panel />}
        </>
    );
}

export default Home;

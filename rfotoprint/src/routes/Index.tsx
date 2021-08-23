import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import FotoServices from '../sections/FotoServices';
import Introduction from '../sections/Introduction';
import Products from '../sections/Products';

function Index() {
    return (
        <>
            <Header />
            <Introduction />
            <FotoServices />
            <Products />
            <Footer />
        </>
    );
}

export default Index;

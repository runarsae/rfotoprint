import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import FotoServices from '../sections/FotoServices';
import Introduction from '../sections/Introduction';
import Supplies from '../sections/Supplies';

function Index() {
    return (
        <>
            <Header />
            <Introduction />
            <FotoServices />
            <Supplies />
            <Footer />
        </>
    );
}

export default Index;

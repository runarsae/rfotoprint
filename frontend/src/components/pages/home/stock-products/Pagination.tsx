import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import {
    currentPageState,
    pageCountState,
    productsErrorState
} from '../../../../state/home/products';
import Typography from '../../../common/Typography';
import IconButton from '../../../common/IconButton';
import { ReactComponent as ArrowLeft } from '../../../../icons/arrow-left.svg';
import { ReactComponent as ArrowRight } from '../../../../icons/arrow-right.svg';
import { scroller } from 'react-scroll';

const Wrapper = styled.div({
    display: 'grid',
    height: '48px',
    gridTemplateColumns: '48px auto 48px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '24px'
});

function Pagination() {
    const pageCount = useRecoilValue(pageCountState);
    const productsError = useRecoilValue(productsErrorState);

    const [currentPage, setCurrentPage] = useRecoilState(currentPageState);

    const scroll = () => {
        scroller.scrollTo('products-in-stock', {
            duration: 300,
            smooth: 'easeInOut'
        });
    };

    const previousPage = () => {
        scroll();

        setCurrentPage((prevPage) => {
            if (prevPage > 1) {
                return prevPage - 1;
            }

            return prevPage;
        });
    };

    const nextPage = () => {
        scroll();

        setCurrentPage((prevPage) => {
            if (prevPage < pageCount) {
                return prevPage + 1;
            }

            return prevPage;
        });
    };

    return (
        <>
            {!productsError && pageCount != 0 && (
                <Wrapper>
                    <IconButton
                        disabled={currentPage == 1}
                        onClick={previousPage}
                        title="Forrige side"
                    >
                        <ArrowLeft />
                    </IconButton>
                    <Typography variant="body2">
                        {currentPage} / {pageCount}
                    </Typography>
                    <IconButton
                        disabled={currentPage == pageCount}
                        onClick={nextPage}
                        title="Neste side"
                    >
                        <ArrowRight />
                    </IconButton>
                </Wrapper>
            )}
        </>
    );
}

export default Pagination;

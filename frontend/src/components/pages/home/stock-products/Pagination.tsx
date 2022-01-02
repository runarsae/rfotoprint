import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { currentPageState, pageCountState } from '../../../../state/products';
import Typography from '../../../common/Typography';
import IconButton from '../../../common/IconButton';
import ArrowLeft from '../../../icons/ArrowLeft';
import ArrowRight from '../../../icons/ArrowRight';
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
        <Wrapper>
            <IconButton disabled={currentPage == 1} onClick={previousPage} title="Forrige side">
                <ArrowLeft />
            </IconButton>
            <Typography variant="body2">
                {currentPage} / {pageCount}
            </Typography>
            <IconButton disabled={currentPage == pageCount} onClick={nextPage} title="Neste side">
                <ArrowRight />
            </IconButton>
        </Wrapper>
    );
}

export default Pagination;

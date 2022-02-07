import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import styled from 'styled-components';
import { currentPageState, pageCountState } from '../../../../state/home/products';
import Typography from '../../../common/Typography';
import IconButton from '../../../common/IconButton';
import { ReactComponent as ArrowLeft } from '../../../../img/icons/arrow-left.svg';
import { ReactComponent as ArrowRight } from '../../../../img/icons/arrow-right.svg';
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
    const pageCountLoadable = useRecoilValueLoadable(pageCountState);

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
            if (prevPage < pageCountLoadable.contents) {
                return prevPage + 1;
            }

            return prevPage;
        });
    };

    return (
        <>
            {pageCountLoadable.state == 'hasValue' && pageCountLoadable.contents != 0 && (
                <Wrapper>
                    <IconButton
                        disabled={currentPage == 1}
                        onClick={previousPage}
                        title="Forrige side"
                    >
                        <ArrowLeft width={24} height={24} />
                    </IconButton>
                    <Typography variant="body2">
                        {currentPage} / {pageCountLoadable.contents}
                    </Typography>
                    <IconButton
                        disabled={currentPage == pageCountLoadable.contents}
                        onClick={nextPage}
                        title="Neste side"
                    >
                        <ArrowRight width={24} height={24} />
                    </IconButton>
                </Wrapper>
            )}
        </>
    );
}

export default Pagination;

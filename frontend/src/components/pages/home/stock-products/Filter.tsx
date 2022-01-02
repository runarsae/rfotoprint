import { scroller } from 'react-scroll';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { Category, categoryState, currentPageState } from '../../../../state/products';
import { ToggleButton, ToggleButtonGroup } from '../../../common/ToggleButton';

function Filter() {
    const [category, setCategory] = useRecoilState(categoryState);
    const resetCurrentPage = useResetRecoilState(currentPageState);

    const changeCategory = (category: Category) => {
        scroller.scrollTo('products-in-stock', {
            duration: 300,
            smooth: 'easeInOut'
        });

        setCategory(category);
        resetCurrentPage();
    };

    return (
        <ToggleButtonGroup>
            <ToggleButton
                onClick={() => {
                    changeCategory(Category.OfficeSupplies);
                }}
                selected={category == Category.OfficeSupplies}
            >
                Kontorrekvisita
            </ToggleButton>
            <ToggleButton
                onClick={() => {
                    changeCategory(Category.Frames);
                }}
                selected={category == Category.Frames}
            >
                Rammer
            </ToggleButton>
        </ToggleButtonGroup>
    );
}

export default Filter;

import { useRecoilState } from 'recoil';
import { Category, categoryState } from '../../../state/panel/products';
import { ToggleButton, ToggleButtonGroup } from '../../common/ToggleButton';

function Filter() {
    const [category, setCategory] = useRecoilState(categoryState);

    const changeCategory = (value: Category) => {
        if (category !== value) {
            setCategory(value);
        }
    };

    return (
        <ToggleButtonGroup>
            <ToggleButton
                onClick={() => {
                    changeCategory(Category.Frames);
                }}
                selected={category == Category.Frames}
            >
                Rammer
            </ToggleButton>
            <ToggleButton
                onClick={() => {
                    changeCategory(Category.OfficeSupplies);
                }}
                selected={category == Category.OfficeSupplies}
            >
                Kontorrekvisita
            </ToggleButton>
        </ToggleButtonGroup>
    );
}

export default Filter;

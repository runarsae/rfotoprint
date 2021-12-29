import { useRecoilState, useResetRecoilState } from 'recoil';
import { categoryState, currentPageState } from '../../../../state/products';
import { ToggleButton, ToggleButtonGroup } from '../../../common/ToggleButton';

function Filter() {
    const [category, setCategory] = useRecoilState(categoryState);
    const resetCurrentPage = useResetRecoilState(currentPageState);

    return (
        <ToggleButtonGroup>
            <ToggleButton
                onClick={() => {
                    setCategory('office-supplies');
                    resetCurrentPage();
                }}
                selected={category == 'office-supplies'}
            >
                Kontorrekvisita
            </ToggleButton>
            <ToggleButton
                onClick={() => {
                    setCategory('frames');
                    resetCurrentPage();
                }}
                selected={category == 'frames'}
            >
                Rammer
            </ToggleButton>
        </ToggleButtonGroup>
    );
}

export default Filter;

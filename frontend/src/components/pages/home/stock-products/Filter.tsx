import { useRecoilState } from 'recoil';
import { categoryState } from '../../../../state/products';
import { ToggleButton, ToggleButtonGroup } from '../../../common/ToggleButton';

function Filter() {
    const [category, setCategory] = useRecoilState(categoryState);

    return (
        <ToggleButtonGroup>
            <ToggleButton
                onClick={() => {
                    setCategory('office-supplies');
                }}
                selected={category == 'office-supplies'}
            >
                Kontorrekvisita
            </ToggleButton>
            <ToggleButton
                onClick={() => {
                    setCategory('frames');
                }}
                selected={category == 'frames'}
            >
                Rammer
            </ToggleButton>
        </ToggleButtonGroup>
    );
}

export default Filter;

import { useState } from 'react';
import { Form } from '../common/form/Form';
import Label from '../common/form/Label';
import SubmitButton from '../common/form/SubmitButton';
import TextInput from '../common/form/TextInput';
import Error from '../common/form/TextInput';
import Title from '../common/Title';

function AddProduct() {
    const [name, setName] = useState<string>('');
    const [inventory, setInventory] = useState<number>();

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    return (
        <div>
            <Title marginTop={0}>Ny vare</Title>
            <Form>
                <div>
                    <Label htmlFor="name">Navn</Label>
                    <TextInput
                        type="text"
                        id="name"
                        name="name"
                        onChange={(e) => {
                            setErrorMessage(null);
                            setName(e.target.value);
                        }}
                    />
                </div>
                <div>
                    <Label htmlFor="image">Bilde</Label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/gif, image/jpeg, image/png"
                    />
                </div>
                <div>
                    <Label htmlFor="password">Lagerbeholdning</Label>
                    <TextInput
                        type="number"
                        id="inventory"
                        name="inventory"
                        onChange={(e) => {
                            setErrorMessage(null);
                            setInventory(parseInt(e.target.value));
                        }}
                    />
                </div>
                {errorMessage && <Error>{errorMessage}</Error>}
                <SubmitButton value="Legg til vare" />
            </Form>
        </div>
    );
}

export default AddProduct;

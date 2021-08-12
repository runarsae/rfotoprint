import { FormEvent, useRef, useState } from 'react';
import { useMutation } from 'graphql-hooks';
import { Form } from '../common/form/Form';
import Label from '../common/form/Label';
import SubmitButton from '../common/form/SubmitButton';
import TextInput from '../common/form/TextInput';
import Error from '../common/form/Error';
import Title from '../common/Title';
import axios from 'axios';
import Confirm from '../common/form/Confirm';
import { CREATE_PRODUCT } from '../../api/mutations';
import NumberInput from '../common/form/NumberInput';

function AddProduct() {
    const [name, setName] = useState<string>('');
    const [image, setImage] = useState<File | ''>('');
    const [category, setCategory] = useState<string>('office-supplies');
    const [inventory, setInventory] = useState<number | ''>('');

    const imageInputRef = useRef<HTMLInputElement>(null);

    const [errorMessage, setErrorMessage] = useState<string>();
    const [confirmMessage, setConfirmMessage] = useState<string>();

    const [createProduct] = useMutation(CREATE_PRODUCT);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name) {
            setErrorMessage('Vennligst fyll inn varenavn.');
            return;
        }

        if (!image) {
            setErrorMessage('Vennligst last opp bilde.');
            return;
        }

        if (!inventory) {
            setErrorMessage('Vennligst fyll inn lagerbeholdning.');
            return;
        }

        // E.g., 12938232323.png
        const imageId = Date.now().toString() + image.name.slice(image.name.indexOf('.'));

        const formData = new FormData();

        formData.append('imageId', imageId);
        formData.append('image', image);

        axios({
            method: 'post',
            url: process.env.REACT_APP_SERVER_ADDRESS + '/upload',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: localStorage.getItem('token')
            }
        })
            .then(async () => {
                const { data } = await createProduct({
                    variables: {
                        product: {
                            name: name,
                            category: category,
                            inventory: inventory,
                            image: imageId
                        }
                    }
                });

                if (data) {
                    if (!data.createProduct.success) {
                        setErrorMessage(data.createProduct.message);
                        return;
                    }

                    // Reset values
                    setName('');
                    setImage('');
                    imageInputRef!.current!.value = '';
                    setCategory('office-supplies');
                    setInventory('');
                    setConfirmMessage('Varen ble lagt til.');
                } else {
                    setErrorMessage('Systemfeil: Varen ble ikke lagt til.');
                }
            })
            .catch((response) => {
                setErrorMessage(response);
            });
    };

    return (
        <div>
            <Title marginTop={0}>Ny vare</Title>
            <Form onSubmit={handleSubmit}>
                <div>
                    <Label htmlFor="name">Navn</Label>
                    <TextInput
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => {
                            setErrorMessage(undefined);
                            setConfirmMessage(undefined);
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
                        ref={imageInputRef}
                        onChange={(e) => {
                            setErrorMessage(undefined);
                            setConfirmMessage(undefined);

                            try {
                                if (e.target.files && e.target.files[0]) {
                                    setImage(e.target.files[0]);
                                } else {
                                    setImage('');
                                }
                            } catch (error) {
                                setErrorMessage(error);
                            }
                        }}
                    />
                </div>
                <div>
                    <Label htmlFor="category">Kategori</Label>
                    <select
                        id="category"
                        name="category"
                        value={category}
                        onChange={(e) => {
                            setErrorMessage(undefined);
                            setConfirmMessage(undefined);
                            setCategory(e.target.value);
                        }}
                    >
                        <option value="office-supplies">Kontorrekvisita</option>
                        <option value="frames">Rammer</option>
                    </select>
                </div>
                <div>
                    <Label htmlFor="inventory">Lagerbeholdning</Label>
                    <NumberInput
                        type="number"
                        id="inventory"
                        name="inventory"
                        value={inventory}
                        onChange={(e) => {
                            setErrorMessage(undefined);
                            setConfirmMessage(undefined);
                            setInventory(parseInt(e.target.value));
                        }}
                    />
                </div>
                {errorMessage && <Error>{errorMessage}</Error>}
                {confirmMessage && <Confirm>{confirmMessage}</Confirm>}
                <SubmitButton value="Legg til vare" />
            </Form>
        </div>
    );
}

export default AddProduct;

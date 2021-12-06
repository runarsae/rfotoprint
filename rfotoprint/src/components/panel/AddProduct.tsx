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
import Select from '../common/form/Select';
import { ImageWrapper, ImageDisplay, ImagePlaceholder } from '../common/form/ImagePreview';

interface Props {
    refreshProducts: () => void;
}

function AddProduct(props: Props) {
    const [name, setName] = useState<string>('');
    const [image, setImage] = useState<File | ''>('');
    const [category, setCategory] = useState<string>('office-supplies');
    // const [inventory, setInventory] = useState<number | ''>('');

    const imageInputRef = useRef<HTMLInputElement>(null);

    const [errorMessage, setErrorMessage] = useState<string>();
    const [confirmMessage, setConfirmMessage] = useState<string>();

    const [createProduct] = useMutation(CREATE_PRODUCT);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setConfirmMessage(undefined);

        if (!name) {
            setErrorMessage('Vennligst fyll inn varenavn.');
            return;
        }

        if (!image) {
            setErrorMessage('Vennligst last opp bilde.');
            return;
        }

        // if (!inventory) {
        //     setErrorMessage('Vennligst fyll inn lagerbeholdning.');
        //     return;
        // }

        // E.g., 12938232323.png
        const imageId = Date.now().toString() + image.name.slice(image.name.lastIndexOf('.'));

        const formData = new FormData();

        formData.append('imageId', imageId);
        formData.append('image', image);

        axios({
            method: 'post',
            url: '/upload',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: localStorage.getItem('token')
            }
        }).then(async () => {
            const { data } = await createProduct({
                variables: {
                    product: {
                        name: name,
                        category: category,
                        // inventory: inventory,
                        image: imageId
                    }
                }
            });

            if (data) {
                if (!data.createProduct.success) {
                    setErrorMessage(data.createProduct.message);
                    return;
                }

                props.refreshProducts();

                // Reset values
                setName('');
                setImage('');
                imageInputRef!.current!.value = '';
                setCategory('office-supplies');
                // setInventory('');
                setConfirmMessage('Varen ble lagt til.');
            } else {
                setErrorMessage('Systemfeil: Varen ble ikke lagt til.');
            }
        });
    };

    return (
        <div>
            <Title color="light" marginTop={0}>
                Ny vare
            </Title>
            <Form onSubmit={handleSubmit}>
                <div>
                    <Label dark htmlFor="name">
                        Navn
                    </Label>
                    <TextInput
                        dark
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
                    <Label dark htmlFor="image">
                        <div style={{ marginBottom: '4px' }}>Bilde</div>
                        <ImageWrapper title="Last opp bilde">
                            {image ? (
                                <ImageDisplay src={URL.createObjectURL(image)} alt="Product" />
                            ) : (
                                <ImagePlaceholder>Last opp bilde</ImagePlaceholder>
                            )}
                        </ImageWrapper>
                    </Label>
                    <input
                        style={{ display: 'none' }}
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
                            } catch (error: any) {
                                setErrorMessage(error);
                            }
                        }}
                    />
                </div>
                <div>
                    <Label dark htmlFor="category">
                        Kategori
                    </Label>
                    <Select
                        dark
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
                    </Select>
                </div>
                {/* <div>
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
                </div> */}
                {errorMessage && <Error>{errorMessage}</Error>}
                {confirmMessage && <Confirm>{confirmMessage}</Confirm>}
                <SubmitButton dark value="Legg til vare" />
            </Form>
        </div>
    );
}

export default AddProduct;

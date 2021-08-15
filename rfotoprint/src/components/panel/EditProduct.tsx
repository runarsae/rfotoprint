import axios from 'axios';
import { useMutation, useQuery } from 'graphql-hooks';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { EDIT_PRODUCT } from '../../api/mutations';
import { PRODUCT } from '../../api/queries';
import Confirm from '../common/form/Confirm';
import Error from '../common/form/Error';
import { Form } from '../common/form/Form';
import { ImageWrapper, ImageDisplay } from '../common/form/ImagePreview';
import Label from '../common/form/Label';
import Select from '../common/form/Select';
import SubmitButton from '../common/form/SubmitButton';
import TextInput from '../common/form/TextInput';
import Title from '../common/Title';

interface Props {
    productId: string;
    onClose: () => void;
    refreshProducts: () => void;
}

function EditProduct(props: Props) {
    const [name, setName] = useState<string>('');
    const [oldImage, setOldImage] = useState<string>();
    const [prevImage, setPrevImage] = useState<string>('');
    const [image, setImage] = useState<File | ''>('');
    const [category, setCategory] = useState<string>('office-supplies');
    // const [inventory, setInventory] = useState<number | ''>('');

    const imageInputRef = useRef<HTMLInputElement>(null);

    const [errorMessage, setErrorMessage] = useState<string>();
    const [confirmMessage, setConfirmMessage] = useState<string>();

    const { data } = useQuery(PRODUCT, { variables: { id: props.productId } });
    const [editProduct] = useMutation(EDIT_PRODUCT);

    useEffect(() => {
        // Fetch product data
        if (data && data.product) {
            const res = data.product;

            if (res.success) {
                setName(res.data.name);
                setOldImage(res.data.image);
                setPrevImage(res.data.image);
                setCategory(res.data.category);
            } else {
                // TODO: ID does not exist
            }
        }
    }, [data]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name) {
            setErrorMessage('Vennligst fyll inn varenavn.');
            return;
        }

        if (!image && !prevImage) {
            setErrorMessage('Vennligst last opp bilde.');
            return;
        }

        // if (!inventory) {
        //     setErrorMessage('Vennligst fyll inn lagerbeholdning.');
        //     return;
        // }

        let imageId = prevImage;

        if (image) {
            // If new image, delete the old one and upload the new one

            axios({
                method: 'delete',
                url: process.env.REACT_APP_SERVER_ADDRESS + '/uploads/supplies/' + oldImage,
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });

            // E.g., 12938232323.png
            imageId = Date.now().toString() + image.name.slice(image.name.lastIndexOf('.'));

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
            });
        }

        const { data } = await editProduct({
            variables: {
                _id: props.productId,
                product: {
                    name: name,
                    category: category,
                    // inventory: inventory,
                    image: imageId
                }
            }
        });

        if (data) {
            if (!data.editProduct.success) {
                setErrorMessage(data.editProduct.message);
                return;
            }

            props.onClose();
            props.refreshProducts();

            // Reset values
            setName('');
            setOldImage('');
            setPrevImage('');
            setImage('');
            imageInputRef!.current!.value = '';
            setCategory('office-supplies');
            // setInventory('');
        } else {
            setErrorMessage('Systemfeil: Varen ble ikke endret.');
        }
    };

    return (
        <div>
            <Title color="light" marginTop={0}>
                Endre vare
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
                        {(prevImage || image) && (
                            <ImageWrapper title="Last opp nytt bilde">
                                <ImageDisplay
                                    src={
                                        prevImage
                                            ? process.env.REACT_APP_SERVER_ADDRESS +
                                              '/uploads/supplies/' +
                                              prevImage
                                            : URL.createObjectURL(image)
                                    }
                                    alt="Product"
                                />
                            </ImageWrapper>
                        )}
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
                            setPrevImage('');

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
                    <Label dark htmlFor="inventory">Lagerbeholdning</Label>
                    <NumberInput
                        dark
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
                <SubmitButton dark value="Endre vare" />
            </Form>
        </div>
    );
}

export default EditProduct;

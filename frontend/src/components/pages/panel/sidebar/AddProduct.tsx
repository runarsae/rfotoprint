import { FormEvent, useRef, useState } from 'react';
import { useMutation } from 'graphql-hooks';
import { Form } from '../../../common/form/Form';
import Label from '../../../common/form/Label';
import SubmitButton from '../../../common/form/SubmitButton';
import TextInput from '../../../common/form/TextInput';
import axios from 'axios';
import { CREATE_PRODUCT } from '../../../../api/mutations';
import Select from '../../../common/form/Select';
import { ImageWrapper, ImageDisplay, ImagePlaceholder } from '../../../common/form/ImagePreview';
import Typography from '../../../common/Typography';
import styled, { useTheme } from 'styled-components';
import { Category, productsQueryState } from '../../../../state/panel/products';
import { useRecoilRefresher_UNSTABLE } from 'recoil';

const Wrapper = styled.div({
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
});

function AddProduct() {
    const theme = useTheme();

    const [name, setName] = useState<string>('');
    const [image, setImage] = useState<File>();
    const [category, setCategory] = useState<Category>(Category.OfficeSupplies);
    // const [inventory, setInventory] = useState<number>();

    const imageInputRef = useRef<HTMLInputElement>(null);

    const [errorMessage, setErrorMessage] = useState<string>();
    const [confirmMessage, setConfirmMessage] = useState<string>();

    const [createProduct] = useMutation(CREATE_PRODUCT);

    const resetFeedback = () => {
        setErrorMessage(undefined);
        setConfirmMessage(undefined);
    };

    const refreshProductsQuery = useRecoilRefresher_UNSTABLE(productsQueryState);

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

        const token = localStorage.getItem('token');

        if (!token) {
            setErrorMessage('Error: Kunne ikke finne bruker.');
            return;
        }

        // if (!inventory) {
        //     setErrorMessage('Vennligst fyll inn lagerbeholdning.');
        //     return;
        // }

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
                Authorization: token
            }
        }).then(async () => {
            const { data } = await createProduct({
                variables: {
                    product: {
                        name: name,
                        category: category.valueOf(),
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

                // Reset values
                setName('');
                setImage(undefined);
                imageInputRef!.current!.value = '';
                setCategory(Category.OfficeSupplies);
                // setInventory(undefined);

                setConfirmMessage('Varen ble lagt til.');

                refreshProductsQuery();
            } else {
                setErrorMessage('Systemfeil: Varen ble ikke lagt til.');
            }
        });
    };

    return (
        <Wrapper>
            <Typography variant="h2" color={theme.palette.common.white}>
                Prisliste
            </Typography>

            <Form onSubmit={handleSubmit}>
                <div>
                    <Label htmlFor="name">Navn</Label>
                    <TextInput
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => {
                            resetFeedback();
                            setName(e.target.value);
                        }}
                    />
                </div>
                <div>
                    <Label htmlFor="image">
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
                            resetFeedback();

                            try {
                                if (e.target.files && e.target.files[0]) {
                                    setImage(e.target.files[0]);
                                } else {
                                    setImage(undefined);
                                }
                            } catch (error: any) {
                                setErrorMessage(error);
                            }
                        }}
                    />
                </div>
                <div>
                    <Label htmlFor="category">Kategori</Label>
                    <Select
                        id="category"
                        name="category"
                        value={category}
                        onChange={(e) => {
                            resetFeedback();
                            setCategory(
                                e.target.value == Category.OfficeSupplies
                                    ? Category.OfficeSupplies
                                    : Category.Frames
                            );
                        }}
                    >
                        <option value={Category.OfficeSupplies}>Kontorrekvisita</option>
                        <option value={Category.Frames}>Rammer</option>
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
                            resetFeedback();
                            setInventory(parseInt(e.target.value));
                        }}
                    />
                </div> */}
                {errorMessage && (
                    <Typography variant="body3" color={theme.palette.error}>
                        {errorMessage}
                    </Typography>
                )}
                {confirmMessage && (
                    <Typography variant="body3" color={theme.palette.success}>
                        {confirmMessage}
                    </Typography>
                )}
                <SubmitButton value="Legg til vare" />
            </Form>
        </Wrapper>
    );
}

export default AddProduct;

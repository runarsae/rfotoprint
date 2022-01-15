import { FormEvent, useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from 'graphql-hooks';
import { Form } from '../../../common/form/Form';
import Label from '../../../common/form/Label';
import SubmitButton from '../../../common/form/SubmitButton';
import TextInput from '../../../common/form/TextInput';
import axios from 'axios';
import { EDIT_PRODUCT } from '../../../../api/mutations';
import Select from '../../../common/form/Select';
import { ImageWrapper, ImageDisplay } from '../../../common/form/ImagePreview';
import Typography from '../../../common/Typography';
import styled, { useTheme } from 'styled-components';
import { Category, editProductIdState, productsQueryState } from '../../../../state/panel/products';
import {
    useRecoilRefresher_UNSTABLE,
    useRecoilValue,
    useResetRecoilState,
    useSetRecoilState
} from 'recoil';
import { PRODUCT } from '../../../../api/queries';
import { sidebarOpenState } from '../../../../state/panel/sidebar';

const Wrapper = styled.div({
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
});

function EditProduct() {
    const theme = useTheme();

    const [name, setName] = useState<string>('');
    const [oldImage, setOldImage] = useState<string>();
    const [prevImage, setPrevImage] = useState<string>('');
    const [image, setImage] = useState<File>();
    const [category, setCategory] = useState<Category>(Category.OfficeSupplies);
    // const [inventory, setInventory] = useState<number | ''>('');

    const imageInputRef = useRef<HTMLInputElement>(null);

    const [errorMessage, setErrorMessage] = useState<string>();
    const [confirmMessage, setConfirmMessage] = useState<string>();

    const editProductId = useRecoilValue(editProductIdState);
    const resetEditProductId = useResetRecoilState(editProductIdState);

    const { data } = useQuery(PRODUCT, { variables: { id: editProductId } });
    const [editProduct] = useMutation(EDIT_PRODUCT);

    const refreshProductsQuery = useRecoilRefresher_UNSTABLE(productsQueryState);

    const setSidebarOpen = useSetRecoilState(sidebarOpenState);

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
                setSidebarOpen(false);
                resetEditProductId();
                refreshProductsQuery();
            }
        }
    }, [data]);

    const resetFeedback = () => {
        setErrorMessage(undefined);
        setConfirmMessage(undefined);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        if (!token) {
            setErrorMessage('Error: Kunne ikke finne bruker.');
            return;
        }

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
                url: '/uploads/products/' + oldImage,
                headers: {
                    Authorization: token
                }
            });

            // E.g., 12938232323.png
            imageId = Date.now().toString() + image.name.slice(image.name.lastIndexOf('.'));

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
            });
        }

        const { data } = await editProduct({
            variables: {
                _id: editProductId,
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

            refreshProductsQuery();

            setSidebarOpen(false);

            setTimeout(() => {
                // Reset values
                setName('');
                setOldImage('');
                setPrevImage('');
                setImage(undefined);
                setCategory(Category.OfficeSupplies);
                // setInventory('');
            }, theme.transitionDuration);
        } else {
            setErrorMessage('Systemfeil: Varen ble ikke endret.');
        }
    };

    return (
        <Wrapper>
            <Typography variant="h2" color={theme.palette.common.white}>
                Endre vare
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
                        {(prevImage || image) && (
                            <ImageWrapper title="Last opp nytt bilde">
                                <ImageDisplay
                                    src={
                                        prevImage
                                            ? '/uploads/products/original/' + prevImage
                                            : URL.createObjectURL(image!)
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
                            resetFeedback();
                            setPrevImage('');

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
                    <Label dark htmlFor="inventory">Lagerbeholdning</Label>
                    <NumberInput
                        dark
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
                <SubmitButton value="Endre vare" />
            </Form>
        </Wrapper>
    );
}

export default EditProduct;

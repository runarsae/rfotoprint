import { atom, selector } from 'recoil';
import { PRODUCTS } from '../../api/queries';
import { Product, ProductsResult } from '../../api/types';

export enum Category {
    OfficeSupplies = 'office-supplies',
    Frames = 'frames'
}

export const categoryState = atom<Category>({
    key: 'panelCategoryState',
    default: Category.Frames
});

export type ProductsPerCategory = {
    [key in Category]: Product[];
};

export const productsState = atom<ProductsPerCategory>({
    key: 'panelProductsState',
    default: {
        [Category.Frames]: [],
        [Category.OfficeSupplies]: []
    }
});

export const productsOrderErrorState = atom<string | undefined>({
    key: 'productsOrderErrorState',
    default: undefined
});

export const productsQuery = selector<ProductsResult>({
    key: 'panelProductsQuery',
    get: async ({ get }) => {
        const category = get(categoryState);

        const response = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: PRODUCTS,
                variables: {
                    filter: { category: category },
                    page: 1,
                    pageSize: 0
                }
            })
        })
            .then((res) => res.json())
            .then((res) => res.data.products as ProductsResult)
            .catch((error) => {
                return {
                    success: false,
                    message: error.message
                };
            });

        if (response) {
            return response;
        } else {
            return {
                success: false,
                message: 'Systemfeil: Kunne ikke laste inn produkter.'
            };
        }
    }
});

export const productsQueryState = selector<Product[]>({
    key: 'panelProductsQueryState',
    get: ({ get }) => {
        const products = get(productsQuery).data?.products;
        return products ? (products as Product[]) : [];
    }
});

export const productsErrorState = selector<string | undefined>({
    key: 'panelProductsErrorState',
    get: ({ get }) => {
        const query = get(productsQuery);

        if (!query.success) {
            return query.message as string;
        }
    }
});

export const editProductIdState = atom<string | undefined>({
    key: 'editProductIdState',
    default: undefined
});

export const popupProductImageState = atom<string | null>({
    key: 'panelPopupProductImageState',
    default: null
});

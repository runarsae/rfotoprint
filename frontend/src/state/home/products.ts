import { atom, selector } from 'recoil';
import { PRODUCTS } from '../../api/queries';
import { Product, ProductsResult } from '../../api/types';

export enum Category {
    OfficeSupplies = 'office-supplies',
    Frames = 'frames'
}

type PageSize = 8 | 9;

export const categoryState = atom<Category>({
    key: 'categoryState',
    default: Category.Frames
});

export const currentPageState = atom<number>({
    key: 'currentPageState',
    default: 1
});

export const pageSizeState = atom<PageSize>({
    key: 'pageSizeState',
    default: 8
});

export const paginationEnabledState = atom<boolean>({
    key: 'paginationEnabledState',
    default: false
});

export const productsQuery = selector<ProductsResult>({
    key: 'productsQuery',
    get: async ({ get }) => {
        const category = get(categoryState);
        const currentPage = get(currentPageState);
        const pageSize = get(pageSizeState);

        const response = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: PRODUCTS,
                variables: {
                    filter: { category: category },
                    page: currentPage,
                    pageSize: pageSize
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

export const productsState = selector<Product[]>({
    key: 'productsState',
    get: async ({ get }) => {
        const query = get(productsQuery);

        if (!query.success) {
            throw new Error(query.message as string);
        }

        const products = query.data?.products;
        return products ? (products as Product[]) : [];
    }
});

export const pageCountState = selector<number>({
    key: 'pageCountState',
    get: ({ get }) => {
        const query = get(productsQuery);

        if (!query.success) {
            throw new Error(query.message as string);
        }

        const pageCount = query.data?.pageCount;
        return pageCount ? pageCount : 0;
    }
});

export const popupProductImageState = atom<string | null>({
    key: 'popupProductImageState',
    default: null
});

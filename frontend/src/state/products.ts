import { useManualQuery } from 'graphql-hooks';
import { atom, selector } from 'recoil';
import { PRODUCTS } from '../api/queries';
import { Product, ProductsQuery, ProductsQueryVariables, ProductsResult } from '../api/types';

type Category = 'office-supplies' | 'frames';
type PageSize = 8 | 9;

export const categoryState = atom<Category>({
    key: 'categoryState',
    default: 'office-supplies'
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
        const [fetchProducts] = useManualQuery<ProductsQuery, ProductsQueryVariables>(PRODUCTS);

        const category = get(categoryState);
        const currentPage = get(currentPageState);
        const pageSize = get(pageSizeState);

        const response = await fetchProducts({
            variables: {
                filter: { category: category },
                page: currentPage,
                pageSize: pageSize
            }
        })
            .then((res) => {
                return res.data?.products;
            })
            .catch((error) => {
                return {
                    success: false,
                    message: error.message
                };
            });

        if (response) {
            return response as ProductsResult;
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
    get: ({ get }) => {
        const products = get(productsQuery).data?.products;
        return products ? (products as Product[]) : [];
    }
});

export const pageCountState = selector<number>({
    key: 'pageCountState',
    get: ({ get }) => {
        const pageCount = get(productsQuery).data?.pageCount;
        return pageCount ? pageCount : 0;
    }
});

export const productsErrorState = selector<string | undefined>({
    key: 'productsErrorState',
    get: ({ get }) => {
        const query = get(productsQuery);

        if (!query.success) {
            return query.message as string;
        }
    }
});

export const popupProductImageState = atom<string | null>({
    key: 'popupProductImageState',
    default: null
});

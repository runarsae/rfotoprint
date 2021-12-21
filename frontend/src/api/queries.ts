/*
 *  User authentication
 */
export const VERIFY_AUTH = `
    query verifyAuth {
        verifyAuth {
            success
        }
    }
`;

/*
 *  Products
 */
export const PRODUCTS = `
    query products($filter: FilterInput!, $page: Int, $pageSize: Int) {
        products(filter: $filter, page: $page, pageSize: $pageSize) {
            success
            message
            data {
                products {
                    _id
                    name
                    image
                    category
                }
                pageCount
            }
        }
    }
`;

export const PRODUCT = `
    query product($id: ID!) {
        product(id: $id) {
            success
            message
            data {
                _id
                name
                image
                category
            }
        }
    }
`;

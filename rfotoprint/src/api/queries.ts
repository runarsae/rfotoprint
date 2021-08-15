/*
 *  User authentication
 */
export const VERIFY_AUTH = `
    {
        verifyAuth {
            success
        }
    }
`;

/*
 *  Products
 */
export const PRODUCTS = `
    query products($page: Int, $pageSize: Int) {
        products(page: $page, pageSize: $pageSize) {
            success
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
            data {
                _id
                name
                image
                category
            }
        }
    }
`;

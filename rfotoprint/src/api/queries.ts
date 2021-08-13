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
    {
        products {
            success
            message
            data {
                _id
                name
                inventory
                image
                description
                url
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

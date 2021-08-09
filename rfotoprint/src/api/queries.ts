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

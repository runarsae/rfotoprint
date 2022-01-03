/*
 *  User authentication
 */
export const SIGN_IN = `
    mutation signIn($username: String!, $password: String!) {
        signIn(username: $username, password: $password) {
            success
            message
            data
        }
    }
`;

/*
 *  Products
 */
export const CREATE_PRODUCT = `
    mutation createProduct($product: ProductInput!) {
        createProduct(product: $product) {
            success
            message
            data
        }
    }
`;

export const EDIT_PRODUCT = `
    mutation editProduct($_id: ID!, $product: ProductInput!) {
        editProduct(_id: $_id, product: $product) {
            success
            message
            data
        }
    }
`;

export const EDIT_PRODUCT_INVENTORY = `
    mutation editProductInventory($_id: ID!, $inventory: Int!) {
        editProductInventory(_id: $_id, inventory: $inventory) {
            success
            message
            data
        }
    }
`;

export const DELETE_PRODUCT = `
    mutation deleteProduct($_id: ID!) {
        deleteProduct(_id: $_id) {
            success
            message
            data
        }
    }
`;

export const EDIT_PRODUCTS_ORDER = `
    mutation editProductsOrder($category: String!, $order: [ID]!) {
        editProductsOrder(category: $category, order: $order) {
            success
            message
        }
    }
`;

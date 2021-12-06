import { buildSchema } from 'graphql';

export const schema = buildSchema(`
    type User {
        _id: ID!
        username: String!
    }

    type Product {
        _id: ID!
        name: String!
        category: String!
        image: String!
        inventory: Int
        description: String
        url: String
    }

    type Products {
        products: [Product]
        pageCount: Int
    }

    input FilterInput {
        category: String
    }

    input ProductInput {
        name: String!
        category: String!
        image: String!
        inventory: Int
        description: String
        url: String
    }

    interface Result {
        success: Boolean!
        message: String
    }

    type DefaultResult implements Result {
        success: Boolean!
        message: String
    }

    type AuthResult implements Result {
        success: Boolean!
        message: String
        data: String
    }

    type IdResult implements Result {
        success: Boolean!
        message: String
        data: ID
    }

    type ProductsResult implements Result {
        success: Boolean!
        message: String
        data: Products
    }

    type ProductResult implements Result {
        success: Boolean!
        message: String
        data: Product
    }

    type Query {
        verifyAuth: DefaultResult!
        products(filter: FilterInput!, page: Int = 1, pageSize: Int = 8): ProductsResult!
        product(id: ID!): ProductResult!
    }

    type Mutation {
        signUp(username: String!, password: String!): AuthResult!
        signIn(username: String!, password: String!): AuthResult!
        createProduct(product: ProductInput!): IdResult!
        editProduct(_id: ID!, product: ProductInput!): IdResult!
        editProductInventory(_id: ID!, inventory: Int!): IdResult!
        deleteProduct(_id: ID!): IdResult!
        editProductsOrder(category: String!, order: [ID]!): DefaultResult!
    }
`);

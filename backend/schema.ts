import { buildSchema } from 'graphql';

export const schema = buildSchema(`
    type User {
        _id: ID!
        username: String!
    }

    type Product {
        _id: ID!
        name: String!
        inventory: Int!
        image: String!
        description: String
        url: String
    }

    input ProductInput {
        name: String!
        category: String!
        inventory: Int!
        image: String!
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
        data: [Product]
    }

    type Query {
        verifyAuth: DefaultResult!
        products: ProductsResult!
    }

    type Mutation {
        signUp(username: String!, password: String!): AuthResult!
        signIn(username: String!, password: String!): AuthResult!
        createProduct(product: ProductInput!): IdResult!
        editProduct(_id: ID!, product: ProductInput!): IdResult!
        editProductInventory(_id: ID!, inventory: Int!): IdResult!
        deleteProduct(_id: ID!): IdResult!
    }
`);

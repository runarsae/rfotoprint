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
        extension: String!
        description: String
        url: String
    }

    input ProductInput {
        name: String!
        inventory: Int!
        description: String
        url: String
    }

    type Query {
        products: [Product]!
    }

    type Mutation {
        signUp(username: String!, password: String!): String!
        signIn(username: String!, password: String!): String!
        createProduct(product: ProductInput!): ID!
        editProduct(_id: ID!, product: ProductInput!): ID!
        editProductInventory(_id: ID!, inventory: Int!): ID!
        deleteProduct(_id: ID!): ID!
    }
`);

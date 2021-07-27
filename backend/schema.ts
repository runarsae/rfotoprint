import { buildSchema } from 'graphql';

export const schema = buildSchema(`
    type User {
        _id: ID!
        username: String!
        password: String!
    }

    type Product {
        _id: ID!
        name: String!
        inventory: Int!
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
        createProduct(product: ProductInput!): ID!
        editProduct(_id: ID!, product: ProductInput!): ID!
        editProductInventory(_id: ID!, inventory: Int!): ID!
        deleteProduct(_id: ID!): ID!
    }
`);

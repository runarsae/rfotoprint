import { db } from './server';
import { ObjectId } from 'mongodb';

export const resolvers = {
    products: async () => {
        try {
            if (!db) throw new Error('Could not connect to MongoDB.');

            const products = await db
                .collection('products')
                .find()
                .toArray()
                .then((result) => {
                    return result;
                })
                .catch((error) => {
                    throw new Error(error);
                });

            return products;
        } catch (error) {
            throw error;
        }
    },

    createProduct: async (input: {
        product: {
            name: string;
            inventory: number;
            description?: string;
            url?: string;
        };
    }) => {
        try {
            const { name, inventory, description, url } = input.product;

            if (!db) throw new Error('Could not connect to MongoDB.');

            const result = await db.collection('products').insertOne({
                name: name,
                inventory: inventory,
                ...(description && { description: description }),
                ...(url && { url: url })
            });

            return result.insertedId;
        } catch (error) {
            throw error;
        }
    },

    editProduct: async (input: {
        _id: string;
        product: {
            name: string;
            inventory: number;
            description?: string;
            url?: string;
        };
    }) => {
        try {
            const _id = new ObjectId(input._id);
            const { name, inventory, description, url } = input.product;

            if (!db) throw new Error('Could not connect to MongoDB.');

            await db.collection('products').updateOne(
                { _id: _id },
                {
                    $set: {
                        name: name,
                        inventory: inventory,
                        ...(description && { description: description }),
                        ...(url && { url: url })
                    },
                    $unset: {
                        ...(!description && { description: '' }),
                        ...(!url && { url: '' })
                    }
                }
            );

            return _id;
        } catch (error) {
            throw error;
        }
    },

    editProductInventory: async (input: { _id: string; inventory: number }) => {
        try {
            const _id = new ObjectId(input._id);
            const inventory = input.inventory;

            if (!db) throw new Error('Could not connect to MongoDB.');

            await db.collection('products').updateOne(
                { _id: _id },
                {
                    $set: { inventory: inventory }
                }
            );

            return _id;
        } catch (error) {
            throw error;
        }
    },

    deleteProduct: async (input: { _id: string }) => {
        try {
            const _id = new ObjectId(input._id);

            if (!db) throw new Error('Could not connect to MongoDB.');

            await db.collection('products').deleteOne({ _id: _id });

            return _id;
        } catch (error) {
            throw error;
        }
    }
};

import { db } from './server';
import { ObjectId } from 'mongodb';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export const resolvers = {
    signUp: async (input: { username: string; password: string }) => {
        try {
            if (!db) throw new Error('Could not connect to MongoDB.');

            const { username, password } = input;

            // TODO: Check if username already exists

            const hashed = await hash(password, 10);

            const user = await db.collection('users').insertOne({
                username: username,
                password: hashed
            });

            return sign({ id: user.insertedId.toHexString() }, process.env.JWT_SECRET as string);
        } catch (error) {
            throw error;
        }
    },

    signIn: async (input: { username: string; password: string }) => {
        try {
            if (!db) throw new Error('Could not connect to MongoDB.');

            const { username, password } = input;

            const user = await db.collection('users').findOne({
                username: username
            });

            if (!user) {
                // TODO: No user found for username
                return '';
            }

            const valid = await compare(password, user.password);

            if (!valid) {
                // TODO: Invalid password
                return '';
            }

            return sign({ id: user._id }, process.env.JWT_SECRET as string);
        } catch (error) {
            throw error;
        }
    },

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
            extension: string;
            description?: string;
            url?: string;
        };
    }) => {
        try {
            if (!db) throw new Error('Could not connect to MongoDB.');

            const { name, inventory, description, url } = input.product;

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
            extension: string;
            description?: string;
            url?: string;
        };
    }) => {
        try {
            if (!db) throw new Error('Could not connect to MongoDB.');

            const _id = new ObjectId(input._id);
            const { name, inventory, description, url } = input.product;

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
            if (!db) throw new Error('Could not connect to MongoDB.');

            const _id = new ObjectId(input._id);
            const inventory = input.inventory;

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
            if (!db) throw new Error('Could not connect to MongoDB.');

            const _id = new ObjectId(input._id);

            await db.collection('products').deleteOne({ _id: _id });

            return _id;
        } catch (error) {
            throw error;
        }
    }
};

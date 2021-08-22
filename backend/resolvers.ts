import { db } from './server';
import { Document, ObjectId } from 'mongodb';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { config } from 'dotenv';
import { existsSync, unlinkSync } from 'fs';
import path from 'path';

interface Result {
    success: boolean;
    message?: string;
    data?: string | Document[] | Document | ObjectId;
}

interface Context {
    auth: boolean;
    user?: {
        id: string;
        username: string;
    };
}

config();

export const resolvers = {
    signUp: async (
        input: { username: string; password: string },
        context: Context
    ): Promise<Result> => {
        try {
            if (!db) throw new Error('Could not connect to database.');

            if (context.auth) throw new Error('Already logged in.');

            const { username, password } = input;

            // Check if username already exists
            const existingUser = await db.collection('users').findOne(
                {
                    username: username
                },
                {
                    projection: { _id: 1 }
                }
            );

            if (existingUser) throw new Error('Username already exists.');

            const hashed = await hash(password, 10);

            const user = await db.collection('users').insertOne({
                username: username,
                password: hashed
            });

            const token = sign(
                { id: user.insertedId.toHexString(), username: username },
                process.env.JWT_SECRET as string
            );

            return {
                success: true,
                message: 'Successfully signed up.',
                data: token
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    },

    signIn: async (
        input: { username: string; password: string },
        context: Context
    ): Promise<Result> => {
        try {
            if (!db) throw new Error('Could not connect to database.');

            if (context.auth) throw new Error('Allerede innlogget.');

            const { username, password } = input;

            const user = await db.collection('users').findOne({
                username: username
            });

            if (!user) throw new Error('Ugyldig brukernavn/passord.');

            const valid = await compare(password, user.password);

            if (!valid) throw new Error('Ugyldig brukernavn/passord.');

            const token = sign(
                { id: user._id, username: username },
                process.env.JWT_SECRET as string
            );

            return {
                success: true,
                message: 'Innlogging vellykket.',
                data: token
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    },

    verifyAuth: async (_: any, context: Context): Promise<Result> => {
        if (context.auth) {
            return {
                success: true
            };
        }

        return {
            success: false
        };
    },

    products: async (input: {
        filter: { category: string };
        page: number;
        pageSize: number;
    }): Promise<Result> => {
        try {
            if (!db) throw new Error('Could not connect to database.');

            const { filter, page, pageSize } = input;

            const queryFilter = [];

            if (filter.category) {
                queryFilter.push({ category: filter.category });
            }

            const query = db.collection('products');

            const products = await query
                .find(queryFilter.length === 0 ? {} : { $and: queryFilter })
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                .toArray()
                .then((result) => {
                    return result;
                });

            const count = await query.countDocuments(
                queryFilter.length === 0 ? {} : { $and: queryFilter }
            );
            let pageCount = Math.floor(count / pageSize);

            if (count % pageSize > 0) {
                pageCount++;
            }

            return {
                success: true,
                data: {
                    products: products,
                    pageCount: pageCount
                }
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    },

    product: async (input: { id: string }): Promise<Result> => {
        try {
            if (!db) throw new Error('Could not connect to database.');

            const product = await db
                .collection('products')
                .findOne({ _id: new ObjectId(input.id) });

            if (!product) {
                throw new Error('Produkt med ID ' + input.id + ' eksisterer ikke.');
            }

            return {
                success: true,
                data: product
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    },

    createProduct: async (
        input: {
            product: {
                name: string;
                category: string;
                // inventory: number;
                image: string;
                description?: string;
                url?: string;
            };
        },
        context: Context
    ): Promise<Result> => {
        try {
            if (!db) throw new Error('Could not connect to database.');

            if (!context.auth) throw new Error('You must be logged in to create a product.');

            const { name, category, image, description, url } = input.product;

            const result = await db.collection('products').insertOne({
                name: name,
                category: category,
                // inventory: inventory,
                image: image,
                ...(description && { description: description }),
                ...(url && { url: url })
            });

            return {
                success: true,
                message: 'Varen ble lagt til.',
                data: result.insertedId
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    },

    editProduct: async (
        input: {
            _id: string;
            product: {
                name: string;
                category: string;
                // inventory: number;
                image: string;
                description?: string;
                url?: string;
            };
        },
        context: Context
    ): Promise<Result> => {
        try {
            if (!db) throw new Error('Could not connect to database.');

            if (!context.auth) throw new Error('You must be logged in to edit a product.');

            const _id = new ObjectId(input._id);
            const { name, category, image, description, url } = input.product;

            await db.collection('products').updateOne(
                { _id: _id },
                {
                    $set: {
                        name: name,
                        category: category,
                        // inventory: inventory,
                        image: image,
                        ...(description && { description: description }),
                        ...(url && { url: url })
                    },
                    $unset: {
                        ...(!description && { description: '' }),
                        ...(!url && { url: '' })
                    }
                }
            );

            return {
                success: true,
                message: 'Product successully edited.',
                data: _id
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    },

    editProductInventory: async (input: { _id: string; inventory: number }, context: Context) => {
        try {
            if (!db) throw new Error('Could not connect to database.');

            if (!context.auth) throw new Error('You must be logged in to edit a product.');

            const _id = new ObjectId(input._id);
            const inventory = input.inventory;

            await db.collection('products').updateOne(
                { _id: _id },
                {
                    $set: { inventory: inventory }
                }
            );

            return {
                success: true,
                message: 'Product successully edited.',
                data: _id
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    },

    deleteProduct: async (input: { _id: string }, context: Context) => {
        try {
            if (!db) throw new Error('Could not connect to database.');

            if (!context.auth) throw new Error('You must be logged in to delete a product.');

            const _id = new ObjectId(input._id);

            const product = await db.collection('products').findOne({ _id: _id });

            if (product) {
                // Delete from database
                await db.collection('products').deleteOne({ _id: _id });

                // Delete image
                const file = path.join(__dirname, 'uploads/products/' + product.image);

                if (existsSync(file)) {
                    unlinkSync(file);
                } else {
                    throw new Error(file + ' does not exist.');
                }
            } else {
                throw new Error('Product does not exist.');
            }

            return {
                success: true,
                message: 'Product successully deleted.',
                data: _id
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }
};

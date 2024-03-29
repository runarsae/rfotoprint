import { db } from './server';
import { ObjectId } from 'mongodb';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import path from 'path';
import {
    AuthResult,
    DefaultResult,
    IdResult,
    Product,
    ProductResult,
    ProductsResult
} from './types';
import { deleteFiles } from './util';

interface Context {
    auth: boolean;
    user?: {
        id: string;
        username: string;
    };
}

export const resolvers = {
    signUp: async (
        input: { username: string; password: string },
        context: Context
    ): Promise<AuthResult> => {
        try {
            if ((process.env.NODE_ENV as string) == 'production') {
                throw new Error('User cannot be created in production.');
            }

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
        } catch (error: any) {
            return {
                success: false,
                message: error.message
            };
        }
    },

    signIn: async (
        input: { username: string; password: string },
        context: Context
    ): Promise<AuthResult> => {
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
        } catch (error: any) {
            return {
                success: false,
                message: error.message
            };
        }
    },

    verifyAuth: async (_: any, context: Context): Promise<DefaultResult> => {
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
    }): Promise<ProductsResult> => {
        try {
            if (!db) throw new Error('Could not connect to database.');

            const { filter, page, pageSize } = input;

            const queryFilter = [];

            if (filter.category) {
                queryFilter.push({ category: filter.category });
            }

            const query = db.collection('products');

            const products = (await query
                .find(queryFilter.length === 0 ? {} : { $and: queryFilter })
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                .toArray()
                .then((result) => {
                    return result;
                })) as Product[];

            const count = await query.countDocuments(
                queryFilter.length === 0 ? {} : { $and: queryFilter }
            );

            let pageCount = 0;

            if (pageSize > 0) {
                pageCount = Math.floor(count / pageSize);

                if (count % pageSize > 0) {
                    pageCount++;
                }
            }

            return {
                success: true,
                data: {
                    products: products,
                    pageCount: pageCount
                }
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.message
            };
        }
    },

    product: async (input: { id: string }): Promise<ProductResult> => {
        try {
            if (!db) throw new Error('Could not connect to database.');

            const product = (await db
                .collection('products')
                .findOne({ _id: new ObjectId(input.id) })) as Product;

            if (!product) {
                throw new Error('Produkt med ID ' + input.id + ' eksisterer ikke.');
            }

            return {
                success: true,
                data: product
            };
        } catch (error: any) {
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
    ): Promise<IdResult> => {
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
                data: result.insertedId.toString()
            };
        } catch (error: any) {
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
    ): Promise<IdResult> => {
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
                data: _id.toString()
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.message
            };
        }
    },

    editProductInventory: async (
        input: { _id: string; inventory: number },
        context: Context
    ): Promise<IdResult> => {
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
                data: _id.toString()
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.message
            };
        }
    },

    deleteProduct: async (input: { _id: string }, context: Context): Promise<IdResult> => {
        try {
            if (!db) throw new Error('Could not connect to database.');

            if (!context.auth) throw new Error('You must be logged in to delete a product.');

            const _id = new ObjectId(input._id);

            const product = await db.collection('products').findOne({ _id: _id });

            if (product) {
                // Delete from database
                await db.collection('products').deleteOne({ _id: _id });

                // Delete images
                const files = [
                    path.join(__dirname, 'uploads/products/original/' + product.image),
                    path.join(__dirname, 'uploads/products/40x40/' + product.image),
                    path.join(__dirname, 'uploads/products/272x180/' + product.image)
                ];

                deleteFiles(files, (err) => {
                    if (err) {
                        throw err;
                    }
                });
            } else {
                throw new Error('Product does not exist.');
            }

            return {
                success: true,
                message: 'Product successully deleted.',
                data: _id.toString()
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.message
            };
        }
    },

    editProductsOrder: async (
        input: { category: string; order: string[] },
        context: Context
    ): Promise<DefaultResult> => {
        try {
            if (!db) throw new Error('Could not connect to database.');

            if (!context.auth) throw new Error('You must be logged in to edit products order.');

            const { category, order } = input;

            const pipeline = [
                // Convert ObjectIds to string representation
                { $set: { _id: { $toString: '$_id' } } },

                // Sort products based on order array
                { $match: { _id: { $in: order } } },
                { $set: { order: { $indexOfArray: [order, '$_id'] } } },
                { $sort: { order: 1 } },
                { $unset: 'order' },

                // Convert string representation of ids back to ObjectIds
                { $set: { _id: { $toObjectId: '$_id' } } },

                // Combine new order of products for the category with products from the other categories
                {
                    $unionWith: {
                        coll: 'products',
                        pipeline: [{ $match: { category: { $ne: category } } }]
                    }
                },

                // Write to database collection
                { $out: 'products' }
            ];

            await db.collection('products').aggregate(pipeline).toArray();

            return {
                success: true,
                message: 'Products order successfully updated.'
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.message
            };
        }
    }
};

#!/usr/bin/env node

import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { Db, MongoClient } from 'mongodb';
import multer from 'multer';
import path from 'path';
import { resolvers } from './resolvers';
import { schema } from './schema';
import { AuthRequest, isAuthenticated, requireAuth } from './auth';
import { config } from 'dotenv';
import sharp from 'sharp';
import { deleteFiles } from './util';

config();

const app = express();

export let db: undefined | Db = undefined;

// Database connection
new MongoClient(process.env.DATABASE_URL as string).connect(function (err, database) {
    if (!database || err) {
        console.log('Could not connect to MongoDB.');
        if (err) console.error(err);
        return;
    }

    db = database.db('rfotoprint');
    console.log('Successfully connected to MongoDB.');

    // Start server
    app.listen(process.env.SERVER_PORT, () => {
        console.log(`Server is running on port: ${process.env.SERVER_PORT}`);
    });
});

// Enable CORS
app.use(cors());

app.use(express.json());

// Middleware to check for user authentication
app.use(isAuthenticated);

// GraphQL endpoint
app.use(
    '/graphql',
    graphqlHTTP((request, _response, _graphQLParams) => {
        const auth = (request as AuthRequest).user;

        return {
            schema: schema,
            rootValue: resolvers,
            context: {
                auth: auth ? true : false,
                ...(auth && {
                    user: auth
                })
            }
        };
    })
);

// Endpoint to access files stored at 'uploads/products/'
app.use('/uploads/products', express.static(path.join(__dirname, 'uploads/products/')));

// Set up storage of files
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint for uploading an image (three sizes)
app.post('/upload', requireAuth, upload.single('image'), async function (req, res, _next) {
    if (req.file) {
        await sharp(req.file.buffer).toFile(`./uploads/products/original/${req.body.imageId}`);
        await sharp(req.file.buffer)
            .resize(40, 40, {
                fit: 'contain',
                background: {
                    r: 255,
                    g: 255,
                    b: 255
                }
            })
            .toFile(`./uploads/products/40x40/${req.body.imageId}`);
        await sharp(req.file.buffer)
            .resize(272, 180, {
                fit: 'contain',
                background: {
                    r: 255,
                    g: 255,
                    b: 255
                }
            })
            .toFile(`./uploads/products/272x180/${req.body.imageId}`);
    }

    res.end();
});

// Endpoint for deleting an image (all sizes)
app.delete('/uploads/products/:imageId', requireAuth, function (req, _res, _next) {
    const files = [
        path.join(__dirname, 'uploads/products/original/' + req.params.imageId),
        path.join(__dirname, 'uploads/products/40x40/' + req.params.imageId),
        path.join(__dirname, 'uploads/products/272x180/' + req.params.imageId)
    ];

    deleteFiles(files, (err) => {
        if (err) {
            throw err;
        }
    });
});

// Serve application located in /www folder
app.use(express.static(path.join(__dirname, 'www')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'www', 'index.html'));
});

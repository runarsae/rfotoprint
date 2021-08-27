import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { Db, MongoClient } from 'mongodb';
import multer from 'multer';
import path from 'path';
import { resolvers } from './resolvers';
import { schema } from './schema';
import { AuthRequest, isAuthenticated, requireAuth } from './auth';
import { existsSync, unlinkSync } from 'fs';
import { config } from 'dotenv';

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
            graphiql: true,
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

// Set up storage of files at 'uploads/products/'
const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, 'uploads/products/');
    },
    filename: function (req, _file, cb) {
        cb(null, req.body.imageId);
    }
});

const upload = multer({ storage: storage });

// Endpoint for uploading an image
app.post('/upload', requireAuth, upload.single('image'), function (_req, res, _next) {
    res.end();
});

// Endpoint for deleting an image
app.delete('/uploads/products/:imageId', requireAuth, function (req, res, _next) {
    const file = path.join(__dirname, 'uploads/products/' + req.params.imageId);

    if (existsSync(file)) {
        unlinkSync(file);
    } else {
        throw new Error(file + ' does not exist.');
    }

    res.end();
});

app.use(express.static(path.join(__dirname, 'www')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'www', 'index.html'));
});

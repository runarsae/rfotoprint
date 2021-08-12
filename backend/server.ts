import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { Db, MongoClient } from 'mongodb';
import multer from 'multer';
import path from 'path';
import { resolvers } from './resolvers';
import { schema } from './schema';
import { AuthRequest, isAuthenticated, requireAuth } from './auth';
import fetch from 'node-fetch';

// TODO: Environment variable
const DATABASE_URL = 'mongodb://127.0.0.1:27017';
const SERVER_PORT = 4000;

const app = express();

export let db: undefined | Db = undefined;

// Database connection
new MongoClient(DATABASE_URL).connect(function (err, database) {
    if (!database || err) {
        console.log('Could not connect to MongoDB.');
        if (err) console.error(err);
        return;
    }

    db = database.db('rfotoprint');
    console.log('Successfully connected to MongoDB.');

    // Start server
    app.listen(SERVER_PORT, () => {
        console.log(`Server is running on port: ${SERVER_PORT}`);
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

// Endpoint to access files stored at 'uploads/supplies/'
app.use('/uploads/supplies', express.static(path.join(__dirname, 'uploads/supplies/')));

// Set up storage of files at 'uploads/supplies/'
const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, 'uploads/supplies/');
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

import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { Db, MongoClient } from 'mongodb';
import multer from 'multer';
import path from 'path';
import { resolvers } from './resolvers';
import { schema } from './schema';
import { existsSync, unlinkSync } from 'fs';
import { verifyUser } from './verifyUser';

const DATABASE_URL = 'mongodb://127.0.0.1:27017';
const SERVER_PORT = 4000;

const app = express();

export let db: undefined | Db = undefined;

// Database connection
new MongoClient(DATABASE_URL).connect(function (err, database) {
    if (!database || err) {
        console.log('Could not connect to MongoDB.');
        return;
    }

    if (err) {
        console.error(err);
        return;
    }

    db = database.db('rfotoprint');
    console.log('Successfully connected to MongoDB.');

    // Start server
    app.listen(SERVER_PORT, () => {
        console.log(`Server is running on port: ${SERVER_PORT}`);
    });
});

// GraphQL endpoint
app.use(
    '/graphql',
    graphqlHTTP((req, _res, _graphQLParams) => {
        // const token = req.headers.authorization;

        // verifyUser(token);

        return {
            schema: schema,
            rootValue: resolvers,
            graphiql: true,
            context: {}
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
    filename: function (req, file, cb) {
        cb(null, req.body.id + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Endpoint for uploading images
app.post('/upload', upload.single('image'), function (_req, res, _next) {
    res.end();
});

app.delete('/uploads/supplies/:file', function (req, res) {
    // TODO: Check if user is authenticated

    const file = path.join(__dirname, 'uploads/supplies/' + req.params.file);

    if (existsSync(file)) {
        console.log('DELETE ' + file);
        unlinkSync(file);
    } else {
        throw new Error(file + ' does not exist.');
    }

    res.end();
});

import express from 'express';
import dotenv from 'dotenv';
import compression from 'compression';
import bodyParser from 'body-parser';
// import tus from 'tus-node-server';

import logger from './logger';
import setupRoutes from './routes';
import { cors } from './middlewares';

// const server = new tus.Server();
// server.datastore = new tus.FileStore({
//     path : '/files',
// });

// server.on(tus.EVENTS.EVENT_UPLOAD_COMPLETE, (event) => {
//     console.log(`Upload complete for file ${event.file.id}`);
// });
// server.on(tus.EVENTS.EVENT_ENDPOINT_CREATED, (event) => {
//     console.log('New endpoint', event);
// });
dotenv.config();

const { PORT, HOST } = process.env;

const app = express();

app.set('port', PORT || 8080);

app.use(cors());

// const uploadApp = express();
// uploadApp.all('*', server.handle.bind(server));
// app.use('/uploads', uploadApp);

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));

app.listen({ host : HOST, port : PORT }, () => {
    logger.info(`Server url ${HOST}:${PORT}`);
});


setupRoutes(app);

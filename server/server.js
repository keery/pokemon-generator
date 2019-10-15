import express from 'express';
import dotenv from 'dotenv';
import compression from 'compression';
import bodyParser from 'body-parser';

import logger from './logger';
import setupRoutes from './routes';
import { cors } from './middlewares';

dotenv.config();

const { PORT } = process.env;

const app = express();

app.set('port', PORT || 8080);

app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));

app.listen(PORT, () => {
    logger.info(`App listening on port ${PORT}!`);
});

setupRoutes(app);

import express from 'express';
import dotenv from 'dotenv';
import compression from 'compression';
import bodyParser from 'body-parser';
import session from 'express-session';
import companion from '@uppy/companion';
import helmet from 'helmet';

import logger from './logger';
import setupRoutes from './routes';
import { cors, getUppyOptions } from './middlewares';

const envResult = dotenv.config();
if (envResult.error) {
    throw envResult.error
}

const { PORT, HOST, PROTOCOL, SESSION_SECRET, CACHE_ID } = process.env;
const uppyOptions = getUppyOptions();

const app = express();

app.set('port', PORT || 8000);

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(session({
    name              : CACHE_ID,
    secret            : SESSION_SECRET,
    resave            : true,
    saveUninitialized : true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(companion.app(uppyOptions));

companion.socket(app.listen(PORT), uppyOptions);

app.listen({ host : HOST, port : PORT }, () => {
    logger.info(`Server url ${PROTOCOL}://${HOST}:${PORT}`);
});

setupRoutes(app);

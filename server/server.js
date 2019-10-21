import express from 'express';
import dotenv from 'dotenv';
import compression from 'compression';
import bodyParser from 'body-parser';
import session from 'express-session';
import companion from '@uppy/companion';

import logger from './logger';
import setupRoutes from './routes';
import { cors, getUppyOptions } from './middlewares';

dotenv.config();
const { PORT, HOST, PROTOCOL, SESSION_SECRET } = process.env;
const uppyOptions = getUppyOptions();

const app = express();

app.set('port', PORT || 8080);

app.use(cors());

app.use(compression());
app.use(session({
    secret            : SESSION_SECRET,
    resave            : true,
    saveUninitialized : true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(companion.app(uppyOptions));

companion.socket(app.listen(PORT), uppyOptions);

app.listen({ host : HOST, port : PORT }, () => {
    logger.info(`Server url ${PROTOCOL}://${HOST}:${PORT}`);
});

setupRoutes(app);

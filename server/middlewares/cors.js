import cors from 'cors';

/**
 * What's CORS ?
 *
 * CORS is a rule which allow/disallow to receive request from another server, by default it's blocked
 * See more : https://developer.mozilla.org/fr/docs/Web/HTTP/CORS
 */
export default () => {
    const whitelist = process.env.WHITE_LIST_ORIGIN ? process.env.WHITE_LIST_ORIGIN.split(',') : [];
    const corsOptions = {
        origin : (origin, callback) => {
            callback(null, true);
            // if (whitelist.indexOf(origin) !== -1) {
            // }
            // else {
            //     callback(new Error('Not allowed by CORS'));
            // }
        },
        credentials : true,
        methods     : 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    };

    return cors(corsOptions);
};

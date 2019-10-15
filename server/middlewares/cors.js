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
            if (whitelist.indexOf(origin) !== -1) {
                callback(null, true);
            }
            else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials : true,
    };

    return cors(corsOptions);
};

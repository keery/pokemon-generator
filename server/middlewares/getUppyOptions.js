import companion from '@uppy/companion';
import { IMAGES_PATH } from '../const'

export default () => {
    const { HOST, PROTOCOL, PORT, INSTA_SECRET, INSTA_KEY, SESSION_SECRET } = process.env;

    return {
        providerOptions : {
            instagram : {
                key    : INSTA_KEY,
                secret : INSTA_SECRET
            },
            s3 : {
                getKey: (req, filename) => `images/${Math.random().toString(32).slice(2)}/${filename}`,
                key    : 'AKIA6EQI76BV4DJ2AX5X',
                secret : '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',
                bucket : 'files-pokemon',
                region : 'eu-west-3',
            }
        },
        server : {
            host     : `${HOST}:${PORT}`,
            protocol : PROTOCOL,
        },
        filePath : IMAGES_PATH,
        secret   : SESSION_SECRET,
        debug    : true,
    };
}

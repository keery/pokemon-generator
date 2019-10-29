import fs from 'fs';
import companion from '@uppy/companion';
import { TMP_PATH } from '../const';

export default () => {
    const {
        HOST, PROTOCOL, PORT, SESSION_SECRET,
        INSTA_SECRET, INSTA_KEY,
        S3_KEY, S3_SECRET, S3_BUCKET, S3_REGION,
    } = process.env;

    if (!fs.existsSync(TMP_PATH)) {
        fs.mkdirSync(TMP_PATH);
    }

    return {
        providerOptions : {
            instagram : {
                key    : INSTA_KEY,
                secret : INSTA_SECRET,
            },
            s3 : {
                getKey : (req, filename) => `images/${Math.random().toString(32).slice(2)}/${filename}`,
                key    : S3_KEY,
                secret : S3_SECRET,
                bucket : S3_BUCKET,
                region : S3_REGION,
            }
        },
        server : {
            host     : `${HOST}:${PORT}`,
            protocol : PROTOCOL,
        },
        filePath : TMP_PATH,
        secret   : SESSION_SECRET,
        debug    : true,
    };
}

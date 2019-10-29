import fs from 'fs';
import companion from '@uppy/companion';
import { TMP_FOLDER } from '../const'

export default () => {
    const {
        HOST, PROTOCOL, PORT, INSTA_SECRET, INSTA_KEY, SESSION_SECRET, WHITE_LIST_ORIGIN,
        S3_KEY, S3_SECRET, S3_BUCKET, S3_REGION,
    } = process.env;

    try {
        fs.accessSync(TMP_FOLDER)
    } catch (err) {
        fs.mkdirSync(TMP_FOLDER)
    }

    return {
        providerOptions : {
            instagram : {
                key    : INSTA_KEY,
                secret : INSTA_SECRET
            },
            s3 : {
                getKey: (req, filename) => `images/${Math.random().toString(32).slice(2)}/${filename}`,
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
        filePath   : TMP_FOLDER,
        secret     : SESSION_SECRET,
        debug      : true,
        uploadUrls : WHITE_LIST_ORIGIN.split(','),
    };
}

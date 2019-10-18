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

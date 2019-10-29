const ROOT = __dirname;

const FILES_FOLDER = '/files';
const FILES_PATH = ROOT + FILES_FOLDER;

const TMP_FOLDER = '/tmp';
const TMP_PATH = ROOT + TMP_FOLDER;

const IS_PROD = process.env.NODE_ENV === 'production';

export {
    IS_PROD,
    ROOT,
    FILES_FOLDER,
    FILES_PATH,
    TMP_PATH,
    TMP_FOLDER,
}

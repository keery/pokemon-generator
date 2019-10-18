const ROOT = __dirname;

const FILES_FOLDER = '/files';
const FILES_PATH = ROOT + FILES_FOLDER;

const IMAGES_FOLDER = `${FILES_FOLDER}/images`;
const IMAGES_PATH = ROOT + IMAGES_FOLDER;

const IS_PROD = process.env.NODE_ENV === 'production';

export {
    IS_PROD,
    ROOT,
    FILES_FOLDER,
    FILES_PATH,
    IMAGES_PATH,
    IMAGES_FOLDER,
}

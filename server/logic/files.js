import { IMAGES_FOLDER } from '../const'

const uploadFile = (req, res) => {
    return res.json({
        uploadURL: `http://${req.get('host')}/static/${req.params.type}/${req.file.filename}`,
        status: 200
    });
};

export default {
    uploadFile,
}

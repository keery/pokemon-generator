import crypto from "crypto";
import dayjs from "dayjs";

const uploadFile = (req, res) => {
  console.log(req.file);
  return res.json({
    uploadURL: `http://${req.get("host")}/static/${req.params.type}/${
      req.file.filename
    }`,
    status: 200,
  });
};

const getTransloaditSignature = (req, res) => {
  const params = {
    auth: {
      expires: dayjs().add(6, "hour").format("YYYY/MM/DD HH:mm:ss+00:00"),
      key: process.env.TRANSLOADIT_KEY,
    },
    template_id: process.env.TRANSLOADIT_TEMPLATE_ID,
  };

  const paramsString = JSON.stringify(params);

  return res.json({
    signature: crypto
      .createHmac("sha1", process.env.TRANSLOADIT_SECRET)
      .update(Buffer.from(paramsString, "utf-8"))
      .digest("hex"),
    params: paramsString,
  });
};

export default {
  getTransloaditSignature,
  uploadFile,
};

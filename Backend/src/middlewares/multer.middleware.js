import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "public", "temp"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
console.log(__dirname, "Public", "temp");

export const upload = multer({
  storage,
});

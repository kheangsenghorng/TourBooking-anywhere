import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "./uploads/profile",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

export const singleUpload = multer({
  storage: storage,
  limits: { fileSize: 1000000  }, // 1MB
  fileFilter: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
  checkFileType: (file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb("Images only!");
    }
  },
}).single("file");

import multer from "multer";
import path from "path";

// Function to check allowed file types
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Images only!"));
  }
}

// Storage for profile uploads
const profileStorage = multer.diskStorage({
  destination: "./uploads/profile",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Storage for tour uploads
const tourStorage = multer.diskStorage({
  destination: "./uploads/tours",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Middleware for single file upload (Profile)
export const singleUpload = multer({
  storage: profileStorage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB limit
  fileFilter: (req, file, cb) => checkFileType(file, cb),
}).single("file");

// Middleware for multiple file uploads (Tours)
export const uploadMultiple = multer({
  storage: tourStorage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 1MB limit
  fileFilter: (req, file, cb) => checkFileType(file, cb),
}).array("files", 40);

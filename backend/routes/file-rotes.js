import express from "express";

const filerouter = express.Router();
import {
  deleteUser,
  getProfileImage,
  getAllUsers,
  getUserById,
  handleUpqload,
  updateUserProfile,
  uploadProfileImage,
  uploadMultipleFiles,
} from "../controllers/file-controllers.js";
import { singleUpload, uploadMultiple } from "../middlewares/upload.js";
import multer from "multer";
import { verifyAdmin } from "../middlewares/adminVerify.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

filerouter.get("/profile/:id", verifyAdmin, getAllUsers);

filerouter.post("/single-upload", singleUpload, handleUpqload);

//upload multiple files by admin id (Protected)
filerouter.post(
  "/multer-uploand/:id",
  verifyAdmin, // Then, check if user is an admin
  uploadMultiple,
  uploadMultipleFiles
);
filerouter.post("/upload-profile/:id", uploadProfileImage);

filerouter.get("/profile-image/:id", getProfileImage);

// Get User Profile (Protected)
filerouter.get("/profile/:id", getUserById);

filerouter.delete("/delete-profile/:id", deleteUser);

// Update User Profile (Protected)
filerouter.put("/update-profile/:id", updateUserProfile);

export default filerouter;

import express from "express";

const filerouter = express.Router();
import {
  deleteUser,
  getUserById,
  handleUpqload,
  updateUserProfile,
  uploadProfileImage,
} from "../controllers/file-controllers.js";
import { singleUpload } from "../middlewares/upload.js";

filerouter.post("/single-upload", singleUpload, handleUpqload);
filerouter.post("/upload-profile/:id", uploadProfileImage);

// Get User Profile (Protected)
filerouter.get("/profile/:id", getUserById);

filerouter.delete("/delete-profile/:id", deleteUser);

// Update User Profile (Protected)
filerouter.put("/update-profile/:id", updateUserProfile);

export default filerouter;

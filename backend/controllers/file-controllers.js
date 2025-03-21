import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { User } from "../models/user-models.js";
import { singleUpload } from "../middlewares/upload.js";

export const handleUpqload = asyncHandler(async (req, res) => {
  //'send past in db
  console.log(req.file);
  return res.json(req.file);
});

// Upload Profile Image
export const uploadProfileImage = (req, res) => {
  const { id } = req.params;
  singleUpload(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err });

    try {
      const user = await User.findById(id);
      if (!user) return res.status(404).json({ message: "User not found" });

      // Delete old profile image if it exists
      if (user.profile_image) {
        const oldImagePath = path.join(
          "./uploads/profile",
          path.basename(user.profile_image)
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      user.profile_image = req.file.filename;
      await user.save();

      res.status(200).json({
        message: "Profile image updated successfully",
        profile_image: user.profile_image,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password"); // Exclude password for security

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update User Profile
export const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;
    user.phonenumber = req.body.phonenumber || user.phonenumber;

    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    await user.save();
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Delete profile image if exists
    if (user.profile_image) {
      const imagePath = path.join(
        "./uploads/profile",
        path.basename(user.profile_image)
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

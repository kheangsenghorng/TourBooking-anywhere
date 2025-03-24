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

//upload multiple files

export const uploadMultipleFiles = (req, res) => {
  const { id } = req.params; // Get the admin ID from the URL
  const files = req.files; // Get uploaded files

  if (!files || files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }
  const fileall = files.length;
  return res.status(200).json({
    message: "Files uploaded successfully",
    adminId: id,
    fileall,
    files: files.map((file) => ({
      originalname: file.originalname,
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype,
      size: file.size,
    })),
  });
};

// export const getProfileImage = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(id);

//     if (!user || !user.profile_image) {
//       return res.status(404).json({ message: "Profile image not found" });
//     }

//     // Construct the absolute path to the image
//     const imagePath = path.join(
//       process.cwd(),
//       "uploads/profile",
//       user.profile_image
//     );

//     // Check if the file exists
//     if (!fs.existsSync(imagePath)) {
//       return res.status(404).json({ message: "Image file not found" });
//     }

//     // Send the image file directly as a response
//     res.sendFile(imagePath);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Internal server error", error: error.message });
//   }
// };

export const getProfileImage = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user || !user.profile_image) {
      return res.status(404).json({ message: "Profile image not found" });
    }

    const imagePath = path.join(
      process.cwd(),
      "uploads/profile",
      user.profile_image
    );

    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ message: "Image file not found" });
    }

    res.sendFile(imagePath);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Get All Users

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } }); // Exclude admin users

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    // Map users to include full image URLs
    const usersWithImages = users.map((user) => ({
      ...user._doc,
      profile_image_url: user.profile_image
        ? `${req.protocol}://${req.get("host")}/uploads/profile/${
            user.profile_image
          }`
        : null,
    }));

    res.status(200).json(usersWithImages);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getProfileImageadmin = async (req, res) => {
  try {
    const { id } = req.params; // ID of the user whose profile image is being fetched
    // ID of the admin making the request (from authentication middleware)

    // Check if the user making the request is an admin
    const admin = await User.findById(id);
    if (!admin || admin.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You must be an admin to perform this action.",
      });
    }

    // Find the user by ID
    const user = await User.findById(id);
    if (!user || !user.profile_image) {
      return res.status(404).json({ message: "Profile image not found" });
    }

    // Construct the image path
    const imagePath = path.join(
      process.cwd(),
      "uploads/profile",
      user.profile_image
    );

    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ message: "Image file not found" });
    }

    // Serve the image file
    res.sendFile(imagePath);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
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

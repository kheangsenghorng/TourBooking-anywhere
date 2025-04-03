import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { User } from "../models/user-models.js";
import Tour from "../models/tour-models.js";
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

export const uploadMultipleFiles = async (req, res) => {
  try {
    const { tourId, id } = req.params; // Extract tour ID and admin ID from URL
    const files = req.files; // Get uploaded files

    if (!files || files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No files uploaded" });
    }

    // Check if the tour exists
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res
        .status(404)
        .json({ success: false, message: "Tour not found" });
    }

    // Append new files to the tour's existing gallery
    const uploadedFiles = files.map((file) => file.filename); // Store just the filenames (not full paths)

    // Add the new images to the gallery
    tour.galleryImages.push(...uploadedFiles);
    await tour.save(); // Save updated tour data

    // Return image URLs in the response, similar to how the user profile image is handled
    const galleryImageUrls = tour.galleryImages.map(
      (image) => `${req.protocol}://${req.get("host")}/uploads/tours/${image}`
    );

    res.status(200).json({
      success: true,
      message: "Files uploaded successfully",
      adminId: id,
      tourId: tour._id,
      totalUploaded: files.length,
      galleryImages: tour.galleryImages,
      galleryUrl: galleryImageUrls, // Include full URLs of the images
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// upload multiple files not by id tour
export const uploadMultipleFilesNot = async (req, res) => {
  try {
    const { id } = req.params; // Extract admin ID from URL
    const files = req.files; // Get uploaded files

    if (!files || files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No files uploaded" });
    }

    // Store just the filenames (not full paths)
    const uploadedFiles = files.map((file) => file.filename);

    // Return image URLs in the response
    const galleryImageUrls = uploadedFiles.map(
      (image) => `${req.protocol}://${req.get("host")}/uploads/tours/${image}`
    );

    res.status(200).json({
      success: true,
      message: "Files uploaded successfully",
      adminId: id,
      totalUploaded: files.length,
      galleryImages: uploadedFiles,
      galleryUrl: galleryImageUrls, // Include full URLs of the images
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all gallery images for a tour

export const getGalleryImages = async (req, res) => {
  try {
    const { tourId } = req.params;

    // Find the tour by ID
    const tour = await Tour.findById(tourId);
    if (!tour || !tour.galleryImages || tour.galleryImages.length === 0) {
      return res.status(404).json({ message: "No images found for this tour" });
    }

    // Generate full URLs for all images
    const galleryImageUrls = tour.galleryImages.map(
      (image) => `${req.protocol}://${req.get("host")}/uploads/${image}`
    );

    res.status(200).json({
      success: true,
      tourId: tour._id,
      totalImages: tour.galleryImages.length,
      galleryImages: tour.galleryImages, // The file names of the images
      galleryUrls: galleryImageUrls, // Image URLs for display
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getTourImage = async (req, res) => {
  const { tourId, imageName } = req.params;

  // Construct the image file path
  const tour = await Tour.findById(tourId);
  if (!tour) {
    return res.status(404).json({ success: false, message: "Tour not found" });
  }
  const imagePath = path.join(process.cwd(), "uploads", "tours", imageName);

  // Check if the file exists
  if (!fs.existsSync(imagePath)) {
    return res.status(404).json({ message: "Image file not found" });
  }

  // Send the image file as a response
  res.sendFile(imagePath);
};
// Serve all gallery images as URLs
// export const getGalleryImages = async (req, res) => {
//   try {
//     const { tourId } = req.params;

//     // Find the tour by ID
//     const tour = await Tour.findById(tourId);
//     if (!tour) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Tour not found" });
//     }

//     // Generate image URLs
//     const galleryImageUrls = tour.galleryImages.map(
//       (image) =>
//         `${req.protocol}://${req.get("host")}/api/upload/${tourId}/${image}`
//     );

//     res.status(200).json({
//       success: true,
//       tourId: tour._id,
//       totalImages: tour.galleryImages.length,
//       galleryImages: tour.galleryImages,
//       galleryUrl: galleryImageUrls,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

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
    // const usersWithImages = users.map((user) => ({
    //   ...user._doc,
    //   profile_image_url: user.profile_image
    //     ? `${req.protocol}://${req.get("host")}/uploads/profile/${
    //         user.profile_image
    //       }`
    //     : null,
    // }));

    const baseUrl =
      process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;
      const usersWithImages = users.map((user) => ({
        ...user._doc,
        profile_image_url: user.profile_image
          ? `${baseUrl}/uploads/profile/${user.profile_image}`
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

export const getGallery = async (req, res) => {
  try {
    const { tourId } = req.params;

    const tour = await Tour.findById(tourId);

    if (!tour) {
      return res
        .status(404)
        .json({ success: false, message: "Tour not found" });
    }

    // Copy the tour object and modify the gallery images
    const baseUrl =
      process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;
    const copiedTour = {
      ...tour.toObject(), // Convert Mongoose document to a plain object
      galleryImages: tour.galleryImages.map(
        (image) => `${baseUrl}/uploads/tours/${image}`
      ),
    };

    return res.status(200).json({
      success: true,
      tour: copiedTour,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getGallerys = async (req, res) => {
  try {
    // Fetch all tours from the database
    const tours = await Tour.find();

    if (!tours || tours.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No tours found" });
    }
    const count = tours.length;

    // Map through all tours and gather the gallery images
    const baseUrl =
      process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;
    const allGalleryImages = tours.map((tour) => ({
      ...tour.toObject(), // Convert the Mongoose document to a plain object
      galleryImages: tour.galleryImages.map(
        (image) => `${baseUrl}/uploads/tours/${image}`
      ),
    }));

    // Return all gallery images for all tours
    res.status(200).json({
      success: true,
      count,
      allGalleryImages: allGalleryImages,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

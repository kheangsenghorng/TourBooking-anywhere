import fs from "fs";
import path from "path";

export const processUploadedFiles = (req) => {
  const files = req.files;

  if (!files || files.length === 0) {
    return { success: false, message: "No files uploaded", uploadedFiles: [] };
  }

  const uploadedFiles = files.map((file) => file.filename);
  const galleryImageUrls = uploadedFiles.map(
    (image) => `${req.protocol}://${req.get("host")}/uploads/tours/${image}`
  );

  return {
    success: true,
    uploadedFiles,
    galleryImageUrls,
    message: "Files uploaded successfully",
  };
};

export const deleteOldGalleryImages = async (oldImages) => {
  // Implement logic to delete the old images from your storage system (local filesystem, S3, etc.)
  for (const image of oldImages) {
    // Example: Delete image from the file system
    try {
      await fs.promises.unlink(`./uploads/${image}`);
    } catch (error) {
      console.error(`Error deleting image: ${image}`, error);
    }
  }
};

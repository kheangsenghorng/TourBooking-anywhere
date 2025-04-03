import Tour from "../models/tour-models.js";
import { User } from "../models/user-models.js";

export const createTour = async (req, res) => {
  try {
    const {
      tour_id,
      tour_name,
      description,
      price,
      start_location,
      first_destination,
      second_destination,
      startDate,
      endDate,
      type,
      status,
      specialStatus,
      overview,
      category,
      location,
      limit,
    } = req.body;

    // Handle uploaded images
    const galleryImages = req.files?.map((file) => file.path) || [];

    // Check if the tour_id already exists
    const existingTour = await Tour.findOne({ tour_id });
    if (existingTour) {
      return res
        .status(400)
        .json({ success: false, message: "Tour ID already exists" });
    }

    // Find an admin user
    const admin = await User.findOne({ role: "admin" });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found. Cannot create a tour without an admin.",
      });
    }

    // Create new tour
    const newTour = new Tour({
      tour_id,
      tour_name,
      description,
      price,
      start_location,
      first_destination,
      second_destination,
      startDate,
      endDate,
      type,
      status,
      specialStatus,
      overview,
      category,
      location,
      limit,
      galleryImages,
      admin: admin._id, // Store admin's ObjectId
    });

    await newTour.save();
    res.status(201).json({
      success: true,
      message: "Tour created successfully",
      tour: newTour,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Display all tours 
export const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      success: true,
      count: tours.length,
      tours,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
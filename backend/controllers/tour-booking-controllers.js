import Tour from "../models/tour-models.js";
import { User } from "../models/user-models.js";
// Display all tours
import { Review } from "../models/review-models.js"; // Import Review model

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

// Display all tours with ratings
export const getAllTours = async (req, res) => {
  try {
    const baseUrl =
      process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;

    // Fetch all tours
    const tours = await Tour.find().populate("admin", "name email");

    if (!tours || tours.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No tours found",
      });
    }

    // Map through tours and fetch ratings
    const updatedTours = await Promise.all(
      tours.map(async (tour) => {
        const reviews = await Review.find({ tourId: tour._id });

        // Calculate the average rating
        const averageRating =
          reviews.length > 0
            ? reviews.reduce((sum, review) => sum + review.rating, 0) /
              reviews.length
            : 0; // Default to 0 if no reviews

        return {
          ...tour.toObject(),
          galleryImages: tour.galleryImages.map(
            (image) => `${baseUrl}/uploads/tours/${image}`
          ),
          averageRating: parseFloat(averageRating.toFixed(1)), // Format to 1 decimal place
          totalReviews: reviews.length,
        };
      })
    );

    res.status(200).json({
      success: true,
      count: updatedTours.length,
      tours: updatedTours,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

import Tour from "../models/tour-models.js";
import { User } from "../models/user-models.js";

// Display all tours
import { Review } from "../models/review-models.js"; // Import Review model
import { formatTour, getReviewsForTour } from "../utils/formatTour.js";

//cracte tour
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

//Filters tours min Price and max Price 00
export const FiltersTour = async (req, res) => {
  try {
    const baseUrl =
      process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;

    const { minPrice, maxPrice } = req.query;

    const query = {};

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    const tours = await Tour.find(query);

    if (!tours.length) {
      return res.status(404).json({
        success: false,
        message: "No tours found within the specified price range",
      });
    }

    const formattedTours = await Promise.all(
      tours.map(async (tour) => {
        const { averageRating, totalReviews } = await getReviewsForTour(
          tour._id
        );

        return {
          ...tour.toObject(),
          galleryImages: tour.galleryImages.map(
            (image) => `${baseUrl}/uploads/tours/${image}`
          ),
          averageRating,
          totalReviews,
        };
      })
    );

    res.status(200).json({
      success: true,
      count: formattedTours.length,
      tours: formattedTours,
    });
  } catch (error) {
    console.error("Error filtering tours:", error);
    res.status(500).json({
      success: false,
      message: "Server error while filtering tours",
    });
  }
};

//Filters tour max participants
export const TourmaxParticipants = async (req, res) => {
  try {
    const { maxParticipants, price } = req.query;

    const query = {};

    if (maxParticipants) {
      const max = parseInt(maxParticipants);
      if (isNaN(max)) {
        return res.status(400).json({
          success: false,
          message: "Invalid maxParticipants value",
        });
      }
      query.maxParticipants = { $lte: max };
    }

    if (price) {
      const maxPrice = parseFloat(price);
      if (isNaN(maxPrice)) {
        return res.status(400).json({
          success: false,
          message: "Invalid price value",
        });
      }
      query.price = { $lte: maxPrice };
    }

    const tours = await Tour.find(query);

    res.status(200).json({
      success: true,
      count: tours.length,
      tours,
    });
  } catch (error) {
    console.error("Error filtering tours:", error);
    res.status(500).json({
      success: false,
      message: "Server error while filtering tours",
    });
  }
};

//Filters toour with day
export const duration = async (req, res) => {
  try {
    const { duration } = req.query;

    if (!duration || isNaN(parseInt(duration))) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid duration in days to filter",
      });
    }

    const targetDays = parseInt(duration);
    // Use lean() to get plain JavaScript objects without Mongoose-specific methods
    const allTours = await Tour.find().lean();

    const filteredTours = allTours.filter((tour) => {
      if (!tour.startDate || !tour.endDate) return false;

      const start = new Date(tour.startDate);
      const end = new Date(tour.endDate);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) return false;

      const days = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
      );

      return days === targetDays;
    });

    if (filteredTours.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No tours found with the specified duration",
      });
    }

    const formattedTours = await Promise.all(
      filteredTours.map((tour) => formatTour(tour, req))
    );

    res.status(200).json({
      success: true,
      count: formattedTours.length,
      tours: formattedTours,
    });
  } catch (error) {
    console.error("Error filtering tours by duration:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while filtering tours",
      error: error.message,
    });
  }
};

export const ratings = async (req, res) => {
  try {
    const { rating } = req.query;

    if (!rating || isNaN(parseFloat(rating))) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid rating value to filter",
      });
    }

    const targetRating = parseFloat(parseFloat(rating).toFixed(1));
    const tolerance = 1;

    const allTours = await Tour.find().lean();
    const toursWithRatings = [];

    for (const tour of allTours) {
      const { averageRating, totalReviews } = await getReviewsForTour(tour._id);

      console.log(
        `Tour: ${tour.name || tour._id} | Avg Rating: ${averageRating}`
      );

      if (
        averageRating >= targetRating - tolerance &&
        averageRating < targetRating + tolerance
      ) {
        toursWithRatings.push({
          ...tour,
          averageRating,
          totalReviews,
        });
      }
    }

    if (toursWithRatings.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No tours found with an average rating around ${targetRating}`,
      });
    }

    const formattedTours = await Promise.all(
      toursWithRatings.map((tour) => formatTour(tour, req))
    );

    res.status(200).json({
      success: true,
      count: formattedTours.length,
      tours: formattedTours,
    });
  } catch (error) {
    console.error("Error retrieving ratings for tours:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while retrieving ratings for tours",
      error: error.message,
    });
  }
};

//fucntion create averagating
// export const getReviewsForTour = async (tourId) => {
//   const reviews = await Review.find({ tourId });

//   const averageRating = reviews.length
//     ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
//     : 0;

//   return {
//     reviews,
//     averageRating: parseFloat(averageRating.toFixed(1)),
//     totalReviews: reviews.length,
//   };
// };

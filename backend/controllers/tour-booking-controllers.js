import Tour from "../models/tour-models.js";
import { User } from "../models/user-models.js";
import { Itinerary } from "../models/itinerary-models.js"; // Import Itinerary model
// Display all tours
import { Review } from "../models/review-models.js"; // Import Review model
import { formatTour, getReviewsForTour } from "../utils/formatTour.js";
import fs from "fs";
import { processUploadedFiles } from "../utils/processUploadedFile.js";
import { createItineraryEntry } from "../services/itineraryService.js";

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
      status,
      overview,
      category,
      location,
      limit,
      itineraries,
    } = req.body;

    const { success, uploadedFiles, message } = processUploadedFiles(req);

    if (!success) {
      return res.status(400).json({ success: false, message });
    }

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
      status,
      overview,
      category,
      location,
      limit,
      galleryImages: uploadedFiles, // filenames only
      admin: admin._id,
    });

    await newTour.save();

    let parsedItineraries = [];
    if (typeof itineraries === "string") {
      parsedItineraries = JSON.parse(itineraries);
    } else {
      parsedItineraries = itineraries;
    }

    // Create itineraries and link them to the tour
    if (Array.isArray(parsedItineraries) && parsedItineraries.length > 0) {
      for (const itinerary of parsedItineraries) {
        await createItineraryEntry({ ...itinerary, tour: newTour._id });
      }
    }

    res.status(201).json({
      success: true,
      message: "Tour created successfully",
      tour: newTour,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllTours = async (req, res) => {
  try {
    const now = new Date();

    // Step 1: Update expired tours to "full"
    const result = await Tour.updateMany(
      { startDate: { $lt: now }, status: { $ne: "Full" } },
      { $set: { status: "Full" } }
    );

    const baseUrl =
      process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;

    // Step 2: Fetch all tours
    const tours = await Tour.find().populate("admin", "name email");

    if (!tours || tours.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No tours found",
      });
    }

    // Step 3: Format tours with gallery images and review stats
    const updatedTours = await Promise.all(
      tours.map(async (tour) => {
        const reviews = await Review.find({ tourId: tour._id });

        const averageRating =
          reviews.length > 0
            ? reviews.reduce((sum, review) => sum + review.rating, 0) /
              reviews.length
            : 0;

        return {
          ...tour.toObject(),
          galleryImages: tour.galleryImages.map(
            (image) => `${baseUrl}/uploads/tours/${image}`
          ),
          averageRating: parseFloat(averageRating.toFixed(1)),
          totalReviews: reviews.length,
        };
      })
    );

    // Step 4: Send response
    res.status(200).json({
      success: true,
      updatedStatusCount: result.modifiedCount,
      count: updatedTours.length,
      tours: updatedTours,
    });
  } catch (error) {
    console.error("❌ Error in getAllTours:", error);
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

export const checkTourId = async (req, res) => {
  const { tour_id } = req.query;

  // Validate the tour_id
  if (!tour_id || typeof tour_id !== "string" || tour_id.trim().length === 0) {
    return res.status(400).json({ error: "Valid tour_id is required" });
  }

  try {
    // Check if tour_id exists in the database
    const exists = await Tour.findOne({ tour_id: tour_id.trim() });

    if (exists) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  } catch (err) {
    console.error("Error checking tour_id:", err); // Log the error for debugging
    res.status(500).json({ error: "Server error, please try again later" });
  }
};

export const updateTour = async (req, res) => {
  const { tourId } = req.params; // tourId is coming from the URL parameter

  try {
    const {
      tour_id, // Assuming tour_id is being passed from the body for updating the value
      tour_name,
      description,
      price,
      start_location,
      first_destination,
      second_destination,
      startDate,
      endDate,
      status,
      overview,
      category,
      location,
      limit,
      itineraries,
    } = req.body;

    // Check if tourId is a valid ObjectId (if you're using ObjectId for tourId)

    // Find the tour by tourId
    const existingTour = await Tour.findOne({ _id: tourId }); // Use _id for MongoDB default field or `tourId` based on your schema

    if (!existingTour) {
      return res
        .status(404)
        .json({ success: false, message: "Tour not found" });
    }

    // let uploadedFiles = [];

    // Handle file uploads if any are provided

    // Update the tour fields
    existingTour.tour_id = tour_id || existingTour.tour_id;
    existingTour.tour_name = tour_name || existingTour.tour_name;
    existingTour.description = description || existingTour.description;
    existingTour.price = price || existingTour.price;
    existingTour.start_location = start_location || existingTour.start_location;
    existingTour.first_destination =
      first_destination || existingTour.first_destination;
    existingTour.second_destination =
      second_destination || existingTour.second_destination;
    existingTour.startDate = startDate || existingTour.startDate;
    existingTour.endDate = endDate || existingTour.endDate;
    existingTour.status = status || existingTour.status;
    existingTour.overview = overview || existingTour.overview;
    existingTour.category = category || existingTour.category;
    existingTour.location = location || existingTour.location;
    existingTour.limit = limit || existingTour.limit;
    // existingTour.galleryImages =
    //   uploadedFiles.length > 0 ? uploadedFiles : existingTour.galleryImages;

    // Save the updated tour
    await existingTour.save();

    // Parse and handle itineraries
    let parsedItineraries = [];
    if (typeof itineraries === "string") {
      parsedItineraries = JSON.parse(itineraries);
    } else {
      parsedItineraries = itineraries;
    }

    // Remove old itineraries and add new ones
    if (Array.isArray(parsedItineraries) && parsedItineraries.length > 0) {
      await Itinerary.deleteMany({ tour: existingTour._id });
      for (const itinerary of parsedItineraries) {
        await createItineraryEntry({ ...itinerary, tour: existingTour._id });
      }
    }

    const itinerariesFine = await Itinerary.find({ tour: existingTour._id });
    const parsedItinerarie = itinerariesFine.map((itinerary) => ({
      ...itinerary.toObject(),
      tour: existingTour._id,
    }));
    // Send the response

    res.status(200).json({
      success: true,
      message: "Tour updated successfully",
      tour: existingTour,
      parsedItinerarie,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const deleteTour = async (req, res) => {
  try {
    const { tourId, fileName } = req.params; // Extract tourId and optional fileName from the URL parameters

    // Find the tour by its ID
    const tour = await Tour.findById(tourId);

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }

    // If fileName is provided, delete that specific image
    if (fileName) {
      if (tour.galleryImages.includes(fileName)) {
        // Remove the image from the gallery
        tour.galleryImages = tour.galleryImages.filter(
          (image) => image !== fileName
        );

        // Optionally delete the image file from the file system
        const imagePath = `./uploads/tours/${fileName}`;
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath); // Delete the image file from the file system
        }

        await tour.save();
        return res.status(200).json({
          success: true,
          message: "Image deleted successfully from the tour",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Image not found in tour gallery",
        });
      }
    }

    // If no fileName is provided, delete all images in the gallery
    for (const image of tour.galleryImages) {
      const imagePath = `./uploads/tours/${image}`;
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // Delete each image file from the file system
      }
    }

    // Clear the galleryImages array
    tour.galleryImages = [];

    // Save the tour with the empty gallery
    await tour.save();

    // Delete all itineraries associated with the tour
    await Itinerary.deleteMany({ tour: tour._id });

    // Delete the tour from the database
    await Tour.deleteOne({ _id: tour._id });

    return res.status(200).json({
      success: true,
      message:
        "Tour, its gallery images, and associated itineraries deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

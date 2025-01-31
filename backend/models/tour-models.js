import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    tour_id: { type: Number, required: true, unique: true }, // Unique ID for each tour
    tour_name: { type: String, required: true }, // Name of the tour
    description: { type: String, required: true }, // Description of the tour
    price: { type: Number, required: true }, // Price of the tour
    start_location: { type: String, required: true }, // Starting location for the tour
    first_destination: { type: String, required: true }, // First destination
    second_destination: { type: String, required: false }, // Second destination (optional)
    startDate: { type: Date, required: true }, // Start date for the tour
    endDate: { type: Date, required: true }, // End date for the tour
    type: {
      type: String,
      required: true,
      enum: ["One Way", "Round Trip"], // Only allows one of these values
    },
    status: {
      type: String,
      required: true,
      enum: ["Active", "Expire"], // Only allows 'Active' or 'Expire'
      default: "Active",
    },
    specialStatus: {
      type: String,
      enum: ["Sold Out", "Special Offer"], // Optional status
    },
    overview: { type: String, required: false }, // Tour overview (optional)
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category", // Reference to Category model
      required: true,
    },
    location: {
      type: mongoose.Types.ObjectId,
      ref: "Location", // Reference to Location model
      required: true,
    },
    company: {
      type: mongoose.Types.ObjectId,
      ref: "User", // Reference to the User model (company)
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Tour = mongoose.model("Tour", tourSchema);

export default Tour;

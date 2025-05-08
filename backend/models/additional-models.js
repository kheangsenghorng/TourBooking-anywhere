import mongoose from "mongoose";

// Define the schema for Additional Info Item
const infoItemSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true, // This ensures that the 'text' field is always required
    minlength: 5, // Minimum length of the text (optional)
    maxlength: 500, // Maximum length of the text (optional)
  },
});

// Create a model from the schema
export const InfoItem = mongoose.model("InfoItem", infoItemSchema);

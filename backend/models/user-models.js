import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    profile_image: {
      type: String, // Store image URL
      default: null, // Default profile image for new users
    },
    email: {
      type: String, // Store user email address for login
      required: true, // Email is required
      unique: true, // Ensure email is unique
    },
    googleId: {
      type: String,
      unique: true, // Ensure Google ID is unique
      sparse: true, // Allow multiple null values for Google users
    },
    facebookId: {
      type: String,
      unique: true, // Ensure Facebook ID is unique
      sparse: true, // Allow multiple null values for Facebook users
    },
    password: {
      type: String,
      default: null, // Optional for Google and Facebook users
    },
    isVerified: {
      type: Boolean,
      default: false, // Google and Facebook users are automatically verified
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "approved", // Default status for Google and Facebook users
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user"],
      default: "user", // Default role for Google and Facebook users
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // For users without admin references
    },
    joined_date: {
      type: Date, // Store user registration date
      default: Date.now, // Default value is current date
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);

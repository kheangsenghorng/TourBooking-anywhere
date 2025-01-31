import { User } from "../models/user-models.js";

// Fetch all users by admin
export const getAllUsers = async (req, res) => {
  const { id } = req.params; // Assuming admin ID is passed as part of the URL

  try {
    // Check if the user requesting is an admin
    const admin = await User.findById(id);
    if (!admin || admin.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You must be an admin to perform this action.",
      });
    }

    // Get all users except for the admin
    const users = await User.find({ _id: { $ne: id } }); // Avoid fetching the admin itself

    // Get the count of users
    const userCount = users.length;

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully.",
      userCount, // Send the user count in the response
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching users.",
    });
  }
};



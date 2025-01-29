import { User } from "../models/user-models.js";
import bcrypt from "bcryptjs";
import { generateJWTToken } from "../utils/generateJWTToken.js";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../resend/email.js";
import crypto from "crypto";
import { createCanvas } from "canvas";
import path from "path";
import fs from "fs";
import axios from "axios";

// Signup function
// export const signup = async (req, res) => {
//   const {
//     firstname,
//     lastname,
//     phonenumber,
//     email,
//     password,
//     adminId, // Optional for users or subadmins
//     status: requestedStatus,
//     role: requestedRole,
//   } = req.body;

//   // Define allowed roles and statuses
//   const allowedRoles = ["admin", "user", "subadmin"];
//   const allowedStatuses = ["pending", "approved", "rejected"];

//   // Validate role and status
//   const role = allowedRoles.includes(requestedRole) ? requestedRole : "user";
//   const status = allowedStatuses.includes(requestedStatus)
//     ? requestedStatus
//     : "pending";

//   try {
//     // Validate required fields
//     if (!firstname) {
//       return res.status(400).json({
//         success: false,
//         message: "First name,",
//       });
//     }
//     if (!lastname) {
//       return res.status(400).json({
//         success: false,
//         message: "last name required.",
//       });
//     }
//     if (!email) {
//       return res.status(400).json({
//         success: false,
//         message: " email are required.",
//       });
//     }
//     if (!password) {
//       return res.status(400).json({
//         success: false,
//         message: ", and password are required.",
//       });
//     }

//     // Check if the user already exists
//     const userAlreadyExists = await User.findOne({ email });
//     if (userAlreadyExists) {
//       return res.status(400).json({
//         success: false,
//         message: "User with this email already exists.",
//       });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const verificationToken = generateVerificationToken();

//     // Validate adminId if the role is user or subadmin
//     let admin = null;

//     admin = await User.findOne({ role: "admin" });
//     if (!admin) {
//       return res.status(404).json({
//         success: false,
//         message: "Admin not found. Check the provided admin ID.",
//       });
//     }

//     // Create a new user
//     const newUser = new User({
//       firstname,
//       lastname,
//       phonenumber,
//       email,
//       password: hashedPassword,
//       role,
//       status,
//       adminId: admin, // Link to admin if applicable
//       verificationToken,
//       verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
//     });

//     // Save the user to the database
//     const savedUser = await newUser.save();

//     // Handle role-specific actions
//     if (role === "admin") {
//       console.log(`New admin created: ${savedUser.email}`);
//       // Additional admin setup can be added here, if necessary
//     } else if (role === "subadmin" || role === "user") {
//       console.log(`User linked to admin: ${admin.email}`);
//       // Optionally: Link this user to the admin's sub-users list if required
//     }

//     // Generate JWT token and set it in a cookie
//     const token = generateJWTToken(res, savedUser._id, savedUser.role);

//     // Send a verification email
//     await sendVerificationEmail(savedUser.email, verificationToken);

//     // Send the final response
//     return res.status(201).json({
//       success: true,
//       message: "User created successfully. Verification email sent.",
//       token,
//       user: {
//         id: savedUser._id,
//         firstname: savedUser.firstname,
//         lastname: savedUser.lastname,
//         email: savedUser.email,
//         phonenumber: savedUser.phonenumber,
//         role: savedUser.role,
//         status: savedUser.status,
//         profile_image: savedUser.profile_image,
//         joined_date: savedUser.joined_date,
//       },
//     });
//   } catch (error) {
//     console.error("Error during signup:", error);

//     // Handle duplicate key error for email or unique fields
//     if (error.code === 11000) {
//       const duplicateField = Object.keys(error.keyValue)[0];
//       return res.status(400).json({
//         success: false,
//         message: `User with this ${duplicateField} already exists.`,
//       });
//     }

//     // Fallback for other errors
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred during signup. Please try again later.",
//     });
//   }
// };
// export const signup = async (req, res) => {
//   const {
//     firstname,
//     lastname,
//     phonenumber,
//     email,
//     password,
//     adminId, // Optional for users or subadmins
//     status: requestedStatus,
//     role: requestedRole,
//   } = req.body;

//   // Define allowed roles and statuses
//   const allowedRoles = ["admin", "user", "subadmin"];
//   const allowedStatuses = ["pending", "approved", "rejected"];

//   // Validate role and status
//   const role = allowedRoles.includes(requestedRole) ? requestedRole : "user";
//   const status = allowedStatuses.includes(requestedStatus)
//     ? requestedStatus
//     : "pending";

//   try {
//     // Validate required fields

//     if (
//       !firstname ||
//       !lastname ||
//       !phonenumber ||
//       !password ||
//       !email ||
//       !password
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Name, email, and password are required.",
//       });
//     }

//     // Check if the user already exists
//     const userAlreadyExists = await User.findOne({ email });
//     if (userAlreadyExists) {
//       return res.status(400).json({
//         success: false,
//         message: "User with this email already exists.",
//       });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const verificationToken = generateVerificationToken();

//     // Validate adminId if the role is user or subadmin
//     let admin = null;

//     if (role === "subadmin" || role === "user") {
//       admin = await User.findOne({ role: "admin" });
//       if (!admin) {
//         return res.status(404).json({
//           success: false,
//           message: "Admin not found. Check the provided admin ID.",
//         });
//       }
//     }

//     // Create a new user
//     const newUser = new User({
//       firstname,
//       lastname,
//       phonenumber,
//       email,
//       password: hashedPassword,
//       role,
//       status,
//       adminId: admin ? admin._id : null, // Link to admin if applicable
//       verificationToken,
//       verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
//     });

//     // Save the user to the database
//     const savedUser = await newUser.save();

//     // Handle role-specific actions
//     if (role === "admin") {
//       console.log(`New admin created: ${savedUser.email}`);
//     } else if (role === "subadmin" || role === "user") {
//       console.log(`User linked to admin: ${admin.email}`);
//     }

//     // Generate JWT token and set it in a cookie
//     const token = generateJWTToken(res, savedUser._id, savedUser.role);

//     // Send a verification email
//     await sendVerificationEmail(savedUser.email, verificationToken);

//     // Send the final response
//     return res.status(201).json({
//       success: true,
//       message: "User created successfully. Verification email sent.",
//       token,
//       user: {
//         id: savedUser._id,
//         name: savedUser.name,
//         email: savedUser.email,
//         role: savedUser.role,
//         status: savedUser.status,
//         profile_image: savedUser.profile_image,
//         joined_date: savedUser.joined_date,
//       },
//     });
//   } catch (error) {
//     console.error("Error during signup:", error);

//     // Handle duplicate key error for email or unique fields
//     if (error.code === 11000) {
//       const duplicateField = Object.keys(error.keyValue)[0];
//       return res.status(400).json({
//         success: false,
//         message: `User with this ${duplicateField} already exists.`,
//       });
//     }

//     // Fallback for other errors
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred during signup. Please try again later.",
//     });
//   }
// };

export const signup = async (req, res) => {
  const {
    firstname,
    lastname,
    phonenumber,
    email,
    password,
    adminId, // Optional for users or subadmins
    status: requestedStatus,
    role: requestedRole,
  } = req.body;

  // Define allowed roles and statuses
  const allowedRoles = ["admin", "user", "subadmin"];
  const allowedStatuses = ["pending", "approved", "rejected"];

  // Validate role and status
  const role = allowedRoles.includes(requestedRole) ? requestedRole : "user";
  const status = allowedStatuses.includes(requestedStatus)
    ? requestedStatus
    : "pending";

  try {
    // Validate required fields
    if (!firstname || !lastname || !phonenumber || !email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Firstname, lastname, phone number, email, and password are required.",
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationToken();

    // Validate adminId for "user" or "subadmin" roles
    let admin = null;

    if (role === "subadmin" || role === "user") {
      admin = await User.findOne({ role: "admin" });
      if (!admin) {
        return res.status(404).json({
          success: false,
          message: "Admin not found. Check the provided admin ID.",
        });
      }
    }

    // Create a new user
    const newUser = new User({
      firstname,
      lastname,
      phonenumber,
      email,
      password: hashedPassword,
      role,
      status,
      adminId: admin ? admin._id : null, // Link to admin if applicable
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    // Save the user to the database
    await newUser.save();

    // Handle role-specific actions
    if (role === "admin") {
      console.log(`New admin created: ${newUser.email}`);
    } else if (role === "subadmin" || role === "user") {
      console.log(`User linked to admin: ${admin.email}`);
    }

    // Generate JWT token and set it in a cookie
    const token = generateJWTToken(res, newUser._id, newUser.role);

    // Send a verification email
    await sendVerificationEmail(newUser.email, verificationToken);

    // Send the final response
    return res.status(201).json({
      success: true,
      message: "User created successfully. Verification email sent.",
      token,
      user: {
        id: newUser._id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        phonenumber: newUser.phonenumber,
        role: newUser.role,
        status: newUser.status,
        profile_image: newUser.profile_image || null,
        joined_date: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error("Error during signup:", error);

    // Handle duplicate key error for email or unique fields
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        success: false,
        message: `User with this ${duplicateField} already exists.`,
      });
    }

    // Fallback for other errors
    return res.status(500).json({
      success: false,
      message: "An error occurred during signup. Please try again later.",
    });
  }
};

//function to logout
export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code.",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.first_name);

    res.status(200).json({
      success: true,
      message: "Email verified successfully.",
    });
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while verifying email.",
    });
  }
};

// Login function
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials." });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials." });
    }

    // Generate JWT token and set it in a cookie
    const token = generateJWTToken(res, user._id, user.role);

    // Send successful login response
    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_number: user.phone_number,
        role: user.role,
        status: user.status,
        profile_image: user.profile_image,
        joined_date: user.joined_date,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const resetPasswordToken = crypto.randomBytes(32).toString("hex");
    const resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpiresAt = resetPasswordExpiresAt;

    await user.save();
    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`
    );

    res.status(200).json({
      success: true,
      message: "Password reset email sent successfully!",
    });
  } catch (error) {
    console.log("error sending password reset email", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    console.log(token);
    console.log(password);
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email);

    res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.log("error resetting password", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, user: { ...user._doc, password: undefined } });
  } catch (error) {
    console.log("error checking auth", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// fuction edit user
export const editUser = async (req, res) => {
  const { userId } = req.params; // Get the userId from URL parameters
  const updateFields = req.body; // Get the fields to update from the request body

  try {
    // Ensure at least one field is being updated
    if (!Object.keys(updateFields).length) {
      return res.status(400).json({
        success: false,
        message: "At least one field must be provided for an update.",
      });
    }

    // Find the user by ID and update the provided fields
    const updatedUser = await User.findByIdAndUpdate(
      userId, // Use the userId from params
      updateFields, // Fields to update
      { new: true } // Return the updated user document
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Send response with the updated user data
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: { ...updatedUser._doc, password: undefined }, // Exclude password
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  const { id } = req.params; // Get the userId from URL parameters

  try {
    // Find and delete the user by ID
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Send response confirming deletion
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};
// login handle google
// login handle google
export const handleGoogle = async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Authorization code is required.",
      });
    }

    // Step 1: Exchange the authorization code for tokens
    const tokenResponse = await axios.post(
      `https://oauth2.googleapis.com/token`,
      {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      }
    );

    const { access_token } = tokenResponse.data;

    if (!access_token) {
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve access token.",
      });
    }

    // Step 2: Fetch user information from Google
    const userResponse = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const userInfo = userResponse.data;

    if (!userInfo.email || !userInfo.sub) {
      return res.status(400).json({
        success: false,
        message: "Failed to retrieve user information from Google.",
      });
    }

    // Step 3: Check if the user already exists
    let user = await User.findOne({ email: userInfo.email });

    // Define allowed roles and statuses
    const allowedRoles = ["admin", "user", "subadmin"];
    const allowedStatuses = ["pending", "approved", "rejected"];
    const defaultRole = "user"; // Default role is user
    const defaultStatus = "approved"; // Google users are auto-approved
    let admin = null;

    if (!user) {
      // If the user doesn't exist, create a new user

      // Check if an admin exists to associate with the user (for user/subadmin roles)
      if (defaultRole === "user" || defaultRole === "subadmin") {
        admin = await User.findOne({ role: "admin" });
        if (!admin) {
          return res.status(404).json({
            success: false,
            message: "Admin not found. Cannot link user to an admin.",
          });
        }
      }

      // Create a new user
      const newUser = new User({
        firstname: userInfo.given_name || "FirstName",
        lastname: userInfo.family_name || "LastName",
        email: userInfo.email,
        googleId: userInfo.sub,
        profile_image: userInfo.picture,
        role: allowedRoles.includes(defaultRole) ? defaultRole : "user",
        status: allowedStatuses.includes(defaultStatus)
          ? defaultStatus
          : "pending",
        isVerified: true,
        adminId: admin ? admin._id : null,
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        phonenumber: `GOOGLE_${userInfo.sub}`, // Unique placeholder
      });


      // Save the new user to the database
      const savedUser = await newUser.save();

      // Handle role-specific actions
      if (savedUser.role === "admin") {
        console.log(`New admin created: ${savedUser.email}`);
      } else if (savedUser.role === "subadmin" || savedUser.role === "user") {
        console.log(`User linked to admin: ${admin.email}`);
      }

      // Redirect to the profile page
      return res.redirect(`${process.env.CLIENT_URL}/profile/${savedUser._id}`);
    } else {
      // If the user exists, update their information
      user.googleId = userInfo.sub;
      user.profile_image = userInfo.picture;

      // Save the updated user
      await user.save();

      console.log(`Existing user logged in: ${user.email}`);

      // Redirect based on user role
      if (user.role === "user") {
        return res.redirect(
          `${process.env.CLIENT_URL}/profile/${user._id}/topcard`
        );
      } else if (user.role === "subadmin") {
        return res.redirect(
          `${process.env.CLIENT_URL}/company/${user._id}/dashboard`
        );
      } else if (user.role === "admin") {
        return res.redirect(`${process.env.CLIENT_URL}/admin/${user._id}`);
      }
    }
  } catch (error) {
    console.error(
      "Error during Google OAuth:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "An error occurred during Google login. Please try again later.",
    });
  }
};
// function to show google auth
export const showGoogleAuth = async (req, res) => {
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=profile%20email&access_type=offline`;

  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_REDIRECT_URI) {
    return res
      .status(500)
      .json({ error: "Missing required environment variables." });
  }

  return res.redirect(googleAuthUrl);
};

// function to handle facebook

export const handleFacebook = async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Authorization code is required.",
      });
    }

    // Step 1: Exchange the authorization code for an access token
    const tokenResponse = await axios.get(
      `https://graph.facebook.com/v12.0/oauth/access_token`,
      {
        params: {
          client_id: process.env.FACEBOOK_APP_ID,
          redirect_uri: process.env.FACEBOOK_REDIRECT_URI,
          client_secret: process.env.FACEBOOK_APP_SECRET,
          code,
        },
      }
    );

    const { access_token } = tokenResponse.data;

    if (!access_token) {
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve access token.",
      });
    }

    // Step 2: Fetch user information from Facebook
    const userResponse = await axios.get(`https://graph.facebook.com/me`, {
      params: {
        access_token,
        fields: "id,name,email,picture,first_name,last_name",
      },
    });

    const userInfo = userResponse.data;

    if (!userInfo.email || !userInfo.id) {
      return res.status(400).json({
        success: false,
        message: "Failed to retrieve user information from Facebook.",
      });
    }

    // Step 3: Check if the user already exists
    let user = await User.findOne({ email: userInfo.email });

    const allowedRoles = ["admin", "user", "subadmin"];
    const allowedStatuses = ["pending", "approved", "rejected"];
    const defaultRole = "user";
    const defaultStatus = "approved";
    let admin = null;

    if (!user) {
      // If the user doesn't exist, create a new user

      if (defaultRole === "user" || defaultRole === "subadmin") {
        admin = await User.findOne({ role: "admin" });
        if (!admin) {
          return res.status(404).json({
            success: false,
            message: "Admin not found. Cannot link user to an admin.",
          });
        }
      }

      // Create a new user
      const newUser = new User({
        firstname: userInfo.first_name || "FirstName", // Default if Facebook does not provide it
        lastname: userInfo.last_name || "LastName", // Default if Facebook does not provide it
        email: userInfo.email,
        facebookId: userInfo.id,
        profile_image: userInfo.picture.data.url,
        role: allowedRoles.includes(defaultRole) ? defaultRole : "user",
        status: allowedStatuses.includes(defaultStatus)
          ? defaultStatus
          : "pending",
        isVerified: true, // Automatically verified for Facebook users
        adminId: admin ? admin._id : null,
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
      });

      const savedUser = await newUser.save();

      // Redirect after successful signup
      return res.redirect(`${process.env.CLIENT_URL}/profile/${savedUser._id}`);
    } else {
      // If the user exists, update their information
      user.facebookId = userInfo.id;
      user.profile_image = userInfo.picture.data.url;
      await user.save();

      console.log(`Existing user logged in: ${user.email}`);

      return res.redirect(`${process.env.CLIENT_URL}/profile/${user._id}`);
    }
  } catch (error) {
    console.error("Error during Facebook OAuth:", error.message);
    return res.status(500).json({
      success: false,
      message:
        "An error occurred during Facebook login. Please try again later.",
    });
  }
};

// function to show facebook auth
export const showFacebookAuth = async (req, res) => {
  const facebookAuthUrl = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${process.env.FACEBOOK_REDIRECT_URI}&scope=email,public_profile`;

  if (!process.env.FACEBOOK_APP_ID || !process.env.FACEBOOK_REDIRECT_URI) {
    return res
      .status(500)
      .json({ error: "Missing required environment variables." });
  }

  return res.redirect(facebookAuthUrl);
};

// Express Backend
import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDatabase from "./database/db.js";
import authRoutes from "./routes/user-routes.js";
import filerouter from "./routes/file-rotes.js";
import addressrouter from "./routes/address-routes.js";
import tourRouter from "./routes/tour-routes.js";
import favorite from "./routes/favorite-routes.js";
import reviewRoutes from "./routes/review-routes.js";
import itineraryRouter from "./routes/itineraries-routes.js";
// import locationRoute from "./routes/loaction-route.js";
// import categoryRoutes from "./routes/category-route.js";
// import tourRoutes from "./routes/company-routes/addpackage-route.js";
// import adminRouter from "./routes/admin-route.js";
// import policiesRouter from "./routes/company-routes/routes-routes.js";
// import bookingRoutes from "./routes/company-routes/booking-routes.js";

dotenv.config();

const app = express();
// Serve static files from the 'uploads' directory

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

connectToDatabase();

app.get("/", (req, res) => {
  res.json("Hello");
});
app.use("/api/auth", authRoutes);
app.use("/api/files", filerouter);
app.use("/api/address", addressrouter);
app.use("/api/tour", tourRouter);
app.use("/api/favorites", favorite);
app.use("/api/reviews", reviewRoutes);
app.use("/api/itinerarie", itineraryRouter);
// app.use("/v1/locations", locationRoute);
// app.use("/v1/categories", categoryRoutes);
// app.use("/v1/tours", tourRoutes);
// app.use("/v1/admins", adminRouter);
// app.use("/v1/policies", policiesRouter);
// app.use("/v1/bookings", bookingRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

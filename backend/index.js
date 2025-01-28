// Express Backend
import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDatabase from "./database/db.js";
import authRoutes from "./routes/user-routes.js";
// import locationRoute from "./routes/loaction-route.js";
// import categoryRoutes from "./routes/category-route.js";
// import tourRoutes from "./routes/company-routes/addpackage-route.js";
// import adminRouter from "./routes/admin-route.js";
// import policiesRouter from "./routes/company-routes/routes-routes.js";
// import bookingRoutes from "./routes/company-routes/booking-routes.js";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.resolve("uploads")));

connectToDatabase();

app.get("/", (req, res) => {
  res.json("Hello");
});
app.use("/api/auth", authRoutes);
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

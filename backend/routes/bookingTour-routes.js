import express from "express";
import {
  createTourBooking,
  deleteTourBooking,
  getAllTourBookings,
  getTourBookingById,
  getTourBookingsByTourId,
  updateTourBooking,
} from "../controllers/booking-controller.js";
import { verifyAdmin } from "../middlewares/adminVerify.js";

const router = express.Router();

router.post("/tour/:tourId/user/:userId", createTourBooking);
router.get("/admin/:id/tour/:tourId", verifyAdmin, getTourBookingsByTourId);
router.get("/", getAllTourBookings);
router.get("/:id", getTourBookingById);
router.put("/:id", updateTourBooking);
router.delete("/:id", deleteTourBooking);

export default router;

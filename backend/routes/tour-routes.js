import express from "express";
import {
  createTour,
  duration,
  FiltersTour,
  getAllTours,
  ratings,
  TourmaxParticipants,
} from "../controllers/tour-booking-controllers.js";
import { uploadMultiple } from "../middlewares/upload.js";
import { verifyAdmin } from "../middlewares/adminVerify.js";

const router = express.Router();

router.post("/:id", verifyAdmin, uploadMultiple, createTour);
router.get("/:id/tours", verifyAdmin, getAllTours);
router.get("/tours", getAllTours);

// GET /api/tours/filter
router.get("/filter", FiltersTour);

router.get("/day", duration);

router.get("/ratings", ratings);
// Route to filter tours by maxParticipants
router.get("/max", TourmaxParticipants);
export default router;

import express from "express";
import {
  checkTourId,
  createTour,
  deleteTour,
  duration,
  FiltersTour,
  getAllTours,
  ratings,
  TourmaxParticipants,
  updateTour,
} from "../controllers/tour-booking-controllers.js";
import { uploadMultiple } from "../middlewares/upload.js";
import { verifyAdmin } from "../middlewares/adminVerify.js";

const router = express.Router();

router.post("/:id", verifyAdmin, uploadMultiple, createTour);
router.get("/:id/tours", verifyAdmin, getAllTours);
router.get("/tours", getAllTours);

router.put("/edit/:tourId", updateTour);

// GET /api/tours/filter
router.get("/filter", FiltersTour);

router.get("/day", duration);

router.get("/ratings", ratings);
// Route to filter tours by maxParticipants
router.get("/max", TourmaxParticipants);

router.get("/check-tour-id", checkTourId);

// DELETE request to delete a tour, an image, or both
router.delete("/:tourId/images/:fileName?", deleteTour);

export default router;

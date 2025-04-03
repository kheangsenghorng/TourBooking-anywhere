import express from "express";
import { createTour, getAllTours } from "../controllers/tour-booking-controllers.js";
import { uploadMultiple } from "../middlewares/upload.js";
import { verifyAdmin } from "../middlewares/adminVerify.js";

const router = express.Router();

router.post("/:id", verifyAdmin, uploadMultiple, createTour);
router.get("/tours", getAllTours);


export default router;

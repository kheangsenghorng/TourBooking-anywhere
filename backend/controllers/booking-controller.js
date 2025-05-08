import { Tourbooking } from "../models/tour-booking-models.js";
import Tour from "../models/tour-models.js";

export const createTourBooking = async (req, res) => {
  try {
    const { tourId, userId } = req.params;
    const { bookingSit, bookingTotal, bookingStatus } = req.body;

    // 1. Get the tour info
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    // 2. Get current total booked seats
    const existingBookings = await Tourbooking.find({ tourId });
    const totalBookedSeats = existingBookings.reduce(
      (sum, booking) => sum + (booking.bookingSit || 0),
      0
    );

    // 3. Check seat availability
    if (totalBookedSeats + bookingSit > tour.limit) {
      return res.status(400).json({
        message: `Not enough seats available. Only ${
          tour.limit - totalBookedSeats
        } left.`,
      });
    }

    // 4. Save new booking
    const newBooking = new Tourbooking({
      tourId,
      userId,
      bookingSit,
      bookingTotal,
      bookingStatus,
    });

    const savedBooking = await newBooking.save();

    // 5. Update tour status to "Full" if limit reached
    const updatedTotalSeats = totalBookedSeats + bookingSit;
    if (updatedTotalSeats >= tour.limit) {
      tour.status = "Full";
      await tour.save();
    }

    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({ message: "Failed to create booking", error });
  }
};

export const getAllTourBookings = async (req, res) => {
  try {
    const bookings = await Tourbooking.find()
      .populate("tourId")
      .populate("userId");

    const bookingMap = new Map();

    bookings.forEach((booking) => {
      const tour = booking.tourId;
      const tourId = tour?._id?.toString();
      if (!tourId) return;

      const existing = bookingMap.get(tourId) || {
        tourId,
        tourName: tour.tour_name,
        totalBookedSeats: 0,
      };

      existing.totalBookedSeats += booking.bookingSit || 0;
      bookingMap.set(tourId, existing);
    });

    const tourSeatCounts = Array.from(bookingMap.values());

    res.status(200).json({
      bookings,
      tourSeatCounts,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings", error });
  }
};

// Get all bookings by Tour ID
export const getTourBookingsByTourId = async (req, res) => {
  try {
    const { tourId } = req.params;

    const bookings = await Tourbooking.find({ tourId }).populate("userId");

    if (bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this tour" });
    }

    const baseUrl = process.env.BASE_URL;

    const bookingsWithUserImages = bookings.map((booking) => {
      const user = booking.userId;

      const profile_image = user?.profile_image
        ? `${baseUrl}/uploads/profile/${user.profile_image}`
        : null;

      return {
        ...booking._doc,
        userId: {
          ...user._doc,
          profile_image,
        },
      };
    });

    res.status(200).json(bookingsWithUserImages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings", error });
  }
};

// Get single tour booking by ID
export const getTourBookingById = async (req, res) => {
  try {
    const booking = await Tourbooking.findById(req.params.id)
      .populate("tourId")
      .populate("userId");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch booking", error });
  }
};

// Update a tour booking
export const updateTourBooking = async (req, res) => {
  try {
    const updatedBooking = await Tourbooking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: "Failed to update booking", error });
  }
};

// Delete a tour booking
export const deleteTourBooking = async (req, res) => {
  try {
    const deletedBooking = await Tourbooking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete booking", error });
  }
};

import { create } from "zustand";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL; // Use the correct API URL

export const useBookingStore = create((set) => ({
  bookings: [],
  tourSeatCounts: [],
  loading: false,
  error: null,
  success: false,
  bookingData: null,

  fetchTourBookings: async (id, tourId) => {
    set({ loading: true, error: null });

    try {
      const res = await fetch(`${API_URL}/booking/admin/${id}/tour/${tourId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // optional: for cookies/session-based auth
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to fetch bookings");
      }

      const data = await res.json();
      set({ bookings: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
  fetchAllTourBookings: async () => {
    set({ loading: true, error: null });

    try {
      const res = await fetch(`${API_URL}/booking`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to fetch bookings");
      }

      const data = await res.json();
      set({
        bookings: data.bookings,
        tourSeatCounts: data.tourSeatCounts,
        loading: false,
      });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
  createBooking: async ({ user_id, tour_id, seats, total }) => {
    set({ loading: true, error: null, success: false });

    try {
      const formData = new FormData();
      formData.append("bookingSit", seats);
      formData.append("bookingTotal", total);

      const response = await axios.post(
        `${API_URL}/booking/tour/${tour_id}/user/${user_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Booking success:", response.data);

      set({
        bookingData: response.data,
        success: true,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Booking failed",
        loading: false,
        success: false,
      });
    }
  },

  resetStatus: () => set({ error: null, success: false, bookingData: null }),

  clearBookings: () => set({ bookings: [], tourSeatCounts: [], error: null }),
}));

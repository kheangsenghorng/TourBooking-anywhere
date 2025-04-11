import { create } from "zustand";
import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const useReviewStore = create((set) => ({
  reviews: [],
  averageRating: 0,
  totalUserReviews: 0,
  lengthuserRating: 0,
  reviewsByTour: [],
  ratingCounts: {},
  tourStatus: "Ongoing",
  isLoading: false,
  error: null,

  // Fetch reviews for a specific tour
  fetchReviews: async (id, tourId) => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.get(`${API_URL}/reviews/${id}/${tourId}`);
      set({
        reviews: res.data.reviews,
        averageRating: res.data.averageRating,
        lengthuserRating: res.data.lengthuserRating,
        ratingCounts: res.data.ratingCounts,
        tourStatus: res.data.tourStatus,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error fetching reviews",
        isLoading: false,
      });
    }
  },

  fetchAllReviews: async (tourId) => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.get(`${API_URL}/reviews/${tourId}`);
      set({
        reviews: res.data.reviews,
        averageRating: res.data.averageRating,
        lengthuserRating: res.data.lengthuserRating,
        ratingCounts: res.data.ratingCounts,
        tourStatus: res.data.tourStatus,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error fetching reviews",
        isLoading: false,
      });
    }
  },
  // Create a new review
  addReview: async (tourId, userId, reviewData) => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.post(
        `/api/reviews/${tourId}/${userId}`,
        reviewData
      );
      set((state) => ({
        reviews: [...state.reviews, res.data], // Add the new review to the list
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error creating review",
        isLoading: false,
      });
    }
  },

  getReviewsByUser: async (userId) => {
    set({ loading: true, error: null });

    try {
      const response = await axios.get(
        `${API_URL}/reviews/${userId}/user/reviews`
      );
      const { userReviews, reviewsByTour } = response.data;

      set({
        reviews: userReviews,
        reviewsByTour, // already includes totalReviews
        totalUserReviews: userReviews.length,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch reviews",
        loading: false,
      });
    }
  },
}));

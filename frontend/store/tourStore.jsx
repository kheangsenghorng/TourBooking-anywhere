import { create } from "zustand";
//Url backenc
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const useTourStore = create((set) => ({
  galleryImages: [],
  gallery: [],
  countTour: [],
  tours: [],
  isLoading: false,
  tour: null,
  loading: false,
  error: null,

  fetchGalleryImages: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${API_URL}/files/gallery`);
      const data = await res.json();

      if (data.success) {
        set({
          galleryImages: data.allGalleryImages,
          countTour: data.count,
          loading: false,
        });
      } else {
        set({ error: data.message, loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  fetchGallery: async (tourId) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/files/galleryid/${tourId}`);
      const data = await response.json();

      if (data.success) {
        set({ gallery: data.tour.galleryImages, loading: false });
      } else {
        set({ error: data.message, loading: false });
      }
    } catch (error) {
      set({ error: "Failed to fetch gallery", loading: false });
    }
  },
  fetchTour: async (tourId) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/files/galleryid/${tourId}`);
      const data = await response.json();

      if (data.success) {
        set({ tour: data.tour, loading: false });
      } else {
        set({ error: data.message, loading: false });
      }
    } catch (error) {
      set({ error: "Failed to fetch gallery", loading: false });
    }
  },
  // Fetch all tours from the backend
  fetchTours: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/tour/${id}/tours`); // Adjust API path if necessary
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch tours");
      }

      set({ tours: data.tours, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

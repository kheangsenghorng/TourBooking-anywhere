import { create } from "zustand";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const useFavoriteStore = create((set) => ({
  favorites: [],
  loading: false,
  error: null,

  fetchFavorites: async (userId) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/favorites/favorite/${userId}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      set({ favorites: data.tours, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addFavorite: async (userId, tourId) => {
    try {
      const response = await fetch(
        `${API_URL}/favorites/add/${userId}/${tourId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      set((state) => ({ favorites: [...state.favorites, data.favorite] }));
      return data.favorite;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  removeFavorite: async (userId, tourId) => {
    try {
      const response = await fetch(
        `${API_URL}/favorites/remove/${userId}/${tourId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      set((state) => ({
        favorites: state.favorites.filter((tour) => tour._id !== tourId),
      }));
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
}));

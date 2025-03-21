// store/userStore.js
import { create } from "zustand";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const profileStore = create((set) => ({
  user: null, // User data
  isAuthenticated: false, // Authentication status
  loading: false, // Loading state
  error: null, // Error state

  // Action to set user data
  setUser: (user) => set({ user, isAuthenticated: !!user }),

  // Action to update user profile
  uploadProfileImage: async (userId, file) => {
    set({ loading: true, error: null, success: false });

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Make a POST request to your backend API
      const response = await fetch(
        `${API_URL}/files/upload-profile/${userId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload profile image");
      }

      const data = await response.json();
      set({ profileImage: data.profile_image, success: true, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Action to delete user
  deleteUser: async (id) => {
    set({ loading: true, error: null });
    try {
      // Simulate an API call to delete user
      await fetch(`/api/users/${id}`, { method: "DELETE" });
      set({ user: null, isAuthenticated: false, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Action to log out
  logout: () => set({ user: null, isAuthenticated: false }),
}));
